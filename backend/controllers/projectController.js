import Project from "../models/Project.js";


//create project
export const createProject = async (req, res) => {
  try {
    const { title, description, tags, community, roles, links } = req.body;
    const project = new Project({
      title,
      description,
      tags,
      community,
      roles,
      links,
      creator: req.user.id,

      //add creator as first member
      members: [
        {
          user: req.user.id,
          role: "Owner",
        },
      ],
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("creator", "name avatar")
      .sort({ createdAt: -1 });

      console.log("Projects fetched:", projects);

    //transform data for your UI
    const formattedProjects = projects.map((p) => ({
      _id: p._id,
      title: p.title,
      author: p.creator?.name || "Unknown",
      roles: p.roles?.map(r => r.title) || [],
      tags: p.tags,
      status: p.status,
      applicants: p.applications?.filter(app => app.status === "Pending").length || 0,
      createdAt: p.createdAt,
    }));

    res.json(formattedProjects);
  } catch (error) {
    console.error("ERROR IN getAllProjects:", error);
    res.status(500).json({ message: error.message });
  }
};

//get single project(detail page)
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("creator", "name avatar")
      .populate("members.user", "name avatar")
      .populate("applications.user", "name avatar");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//apply to project
export const applyToProject = async (req, res) => {
  try {
    const { role, message } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    //prevent duplicate applications
    const alreadyApplied = project.applications.find(
      (app) => app.user.toString() === req.user.id
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }
    project.applications.push({
      user: req.user.id,
      role,
      message,
    });
    await project.save();
    res.json({ message: "Application submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update project
export const updateProject = async (req, res) => {
  try {
    const { title, description, tags, community, roles, links, status } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    //Only owner can edit
    if (project.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    // update fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.tags = tags || project.tags;
    project.community = community || project.community;
    project.roles = roles || project.roles;
    project.links = links || project.links;
    project.status = status || project.status;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//accept application
export const acceptApplication = async (req, res) => {
  try {
    const { applicationId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    //check owner
    if (project.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const application = project.applications.id(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    //update status
    application.status = "Accepted";
    //add to members
    project.members.push({
      user: application.user,
      role: application.role,
    });
    //update role filled count
    const role = project.roles.find(
      (r) => r.title === application.role
    );
    if (role) {
      role.filled += 1;
    }
    await project.save();
    res.json({ message: "Application accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//reject application
export const rejectApplication = async (req, res) => {
  try {
    const { applicationId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const application = project.applications.id(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    application.status = "Rejected";
    await project.save();

    res.json({ message: "Application rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    //Only owner
    if (project.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    //Check other members (excluding owner)
    const otherMembers = project.members.filter(
      (m) => m.user.toString() !== req.user.id
    );
    if (otherMembers.length > 0) {
      return res.status(400).json({
        message: "Cannot delete project with active members",
      });
    }
    //Check applications
    const hasPendingApplications = project.applications.some(
      (app) => app.status === "Pending"
    );
    if (hasPendingApplications) {
      return res.status(400).json({
        message: "Cannot delete project with pending applications",
      });
    }
    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};