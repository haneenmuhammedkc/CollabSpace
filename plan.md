# CollabSpace - Comprehensive Project Master Plan

## 1. Project Overview & Pitch
**Name:** CollabSpace
**Tagline:** Built Teams, Build Ideas.
**Description:** A developer community and collaboration platform where developers can join specific hubs, post open-source project ideas, pitch to peers, and build teams to bring ideas to life.

## 2. Global UI/UX Guidelines
*   **Theme:** Soft, muted earthy pastel theme.
*   **Color Palette:**
    *   **Background:** `#F1F0E8`
    *   **Surface/Accent:** `#E5E1DA`
    *   **Secondary:** `#B3C8CF`
    *   **Primary Action/Branding:** `#89A8B2`
*   **Typography:** Professional, clean sans-serif fonts (e.g., *Inter*, *Roboto*, or system UI fonts like *San Francisco*/*Segoe UI*) to maintain a mature developer aesthetic.
*   **Navigation:** Top or side navigation bar consistently available across all authenticated pages.
*   **Responsiveness:** Mobile-first approach, fully responsive for tablets and desktops.
*   **Feedback & State:** Clear loading states, success toasts on actions, and error handling for all forms.

## 3. Comprehensive Page Breakdown

### 3.1. Public / Unauthenticated Pages

**Landing Page (`/`)**
*   **Global Layout:** Seamless integration with standard `Navbar` (glassmorphism, center links with animated active states) and `Footer` resting on `#E5E1DA` background.
*   **Hero Section:**
    *   **Background:** Floating, animated developer symbols (`<>`, `{ }`, `</>`, `#`) set against soft glowing pastel orbs (`#B3C8CF`, `#E5E1DA`, `#89A8B2`) with slow pulsing and drift animations.
    *   **Headline:** "Code Alone, Build Together." utilizing dynamic, slow-transitioning gradients triggered on hover.
    *   **CTAs:** "Join the Community" (Premium `#89A8B2` rounded button with drop shadow lift) & "Explore Projects" (Glassy surface button with pinging accent dots).
*   **Features Section:**
    *   "Everything you need to collaborate" layout mounted on an `#E5E1DA` surface with a custom grainy noise texture overlay.
    *   Cards appear as floating tiles featuring customized SVG wrapper gradients and a radial glowing gradient transition on hover.
*   **Trending Projects Section:**
    *   Grid of open-source ideas showcasing project detail cards.
    *   Cards display "Open" status badges with active, pulsing `#89A8B2` notification dots.
    *   Hovering over cards reveals a subtle background gradient and colorizes skill tags into solid branded buttons.

**Authentication Pages**
*   **Sign Up (`/signup`):** Minimalist form with Full Name, Email, Password. Options to "Sign up with GitHub/Google" (OAuth).
*   **Login (`/login`):** Email & Password fields, OAuth buttons, "Forgot Password" link.

### 3.2. User Experience Pages

**User Dashboard / Feed (`/dashboard`)** *[Home page after login]*
*   **Personalized Feed:** Posts from joined communities, recent project ideas matching the user's skills.
*   **Quick Stats:** Number of connections, active project applications.
*   **Sidebar/Widgets:** "Trending Communities", "Suggested Open-Source Projects".

**User Profile (`/profile/[username]`)**
*   **Header:** Avatar, Cover Image, Name, Headline (e.g., "Full Stack Dev").
*   **Bio & Links:** Short description, links to GitHub, LinkedIn, Portfolio.
*   **Skills Bar:** Tags of tech stack (React, Node, Python, UI/UX, etc.) - Designed as minimal blue/light blue tags.
*   **Activity Section:** Tabs showing "Projects Created", "Projects Joined", and "Communities".
*   *Note: Gamification/Reputation features are planned for future versions and are not included in v1.*

**Settings (`/settings`)**
*   **Profile Settings:** Form to update avatar, bio, links, and skills.
*   **Account Settings:** Change password, delete account.

### 3.3. Communities (Hubs) Pages

**Explore Communities (`/communities`)**
*   **Search & Filters:** Find communities by name or topic/category.
*   **Community Cards:** Minimalist design with Logo, Name, Member Count, Short Description, "Join" button.

**Community Dashboard (`/communities/[id]`)**
*   **Header:** Community banner, stats, "Leave" button.
*   **Feed/Forum:** Area to post questions, share links, general chat within the specific topic.
*   **Members List:** Tab to view who is part of the community.

### 3.4. Project & Team Building Pages

**Project Idea Board (`/projects`)**
*   *Focus: Strictly Open-Source Projects.*
*   **Search & Filter:** Filter by tech stack, role needed (e.g., "Need Designer"), status.
*   **Create Project Button:** Primary CTA to submit a new open-source idea.
*   **Project Cards:** Title, short description, tags of required skills, upvote count, discussion count.

**Project Detail Page (`/projects/[id]`)**
*   **Main Header:** Project Title, Creator Profile Link, Date Posted.
*   **Description:** Full markdown-supported description of the open-source idea.
*   **Open Roles:** Specific roles the creator is looking for (e.g., "Frontend Dev", "Backend Dev").
*   **Action Area:** "Apply to Join" button (opens a modal to send a pitch/message).
*   **Discussion:** Comments section.

**Create/Edit Project Form (`/projects/create`)**
*   **Fields:** Title, Detailed Description (Markdown), Required Skills, Open Roles.

### 3.5. Collaboration Pages (Private to Team Members)

**Project Workspace (`/workspace/[id]`)**
*   **Overview:** Important links (GitHub Repo, Deployed App URL).
*   **Team Chat:** Real-time live group chat for team members. *(Confirmed for MVP timeline)*.
*   **Basic Task Board:** Simple Kanban (To Do, In Progress, Done) for the team to organize work.

**Application Management (`/projects/[id]/applications`)** *(Only visible to Project Creators)*
*   **List of Applicants:** Show applicant profile snippets, the role they applied for, and the custom message.
*   **Actions:** "Accept" or "Reject" buttons.
*   **Team Roster:** Manage accepted members.

## 4. Technical Stack & Architecture

*   **Frontend Framework:** React.js (Single Page Application architecture).
*   **Styling:** Tailwind CSS for rapid, highly customizable utility-first styling (implementing the strict white/blue minimalist theme).
*   **Backend Environment:** Node.js.
*   **Backend Framework:** Express.js for building robust REST APIs.
*   **Database:** MongoDB (NoSQL) for flexible schema design and rapid iteration.
*   **Authentication:** Custom JWT (JSON Web Token) authentication for secure, stateless user sessions.
*   **Real-time Communication:** Socket.io (or similar WebSocket library) integrated with Node.js/Express for live team chat.

## 5. Database Entities (High-Level Mongoose Schema Concept)
*   **User:** (ID, Name, Email, PasswordHash, Avatar, Bio, Skills[], Links{})
*   **Community:** (ID, Name, Description, MemberCount, Tags[])
*   **Project:** (ID, Title, Description, CreatorID, RequiredSkills[], OpenRoles[], Status, Upvotes)
*   **Application:** (ID, ProjectID, UserID, RoleAppliedFor, Message, Status [Pending/Accepted/Rejected])
*   **Comment/Post:** (ID, AuthorID, Content, ParentEntityID [Project or Community])
*   **Message:** (ID, WorkspaceID, AuthorID, Content, Timestamp) *(For Real-Time Live Chat Integration)*

## 6. System Workflows

*   **Project Creation Flow:** User clicks "Create Project" -> Fills form -> Open-source project appears on Idea Board.
*   **Application Flow:** User finds project -> Clicks "Apply" for a specific role -> Submits short pitch -> Creator gets notification -> Creator accepts via Application Management -> User is added to Project Workspace.
