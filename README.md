ReliefNet
Problem Statement
In rural India, disasters like floods, cyclones, and earthquakes happen very often. People do not know how to ask for help, NGOs do not know exactly where to send resources, and volunteers do not know where they should go. Because of this, some areas receive too many resources, some get nothing, and relief work gets delayed. Volunteers are not used properly, and many people continue to suffer without timely help.

Solution
ReliefNet is a web-based platform that connects villagers, NGOs, volunteers, and the government on one system. It allows real-time help requests, resource sharing, task assignment to volunteers, and transparent tracking of all activities. The platform also works offline so that people without continuous internet can still ask for help and update data.

How the website works
Landing Page
The first page any visitor sees is the landing page. It introduces ReliefNet and explains what it does in simple words. It shares information about the problem, how ReliefNet solves it, and encourages people to join as a volunteer, NGO, or donor. It highlights key features and builds trust before a user enters the main site.

Home Page
The home page shows an overview of all important data. It displays the total number of SOS requests, missing person reports, available resources, active volunteers, and active NGOs. It also has a map showing relief camps, shelters, food centers, and medical camps. Visitors can also see donation options and choose to support a specific NGO or the admin directly.

Dashboards
There are four dedicated dashboards in the system.

Victim Dashboard
Victims can register using their mobile number, name, email ID, Aadhaar number, and date of birth. Inside the victim dashboard, they can submit SOS requests, see maps with nearby shelters, medical camps, and food centers. They can also see the availability of resources and track where work has already been done.

Volunteer Dashboard
Volunteers sign up by providing their full name, email, password, mobile number, skills (such as first aid, driving), and location. In their dashboard, volunteers can submit SOS or missing reports, see which volunteers have been assigned to which tasks and locations, check remaining resources and where they need to be delivered, and view their own team details. Volunteers can also contact other team members directly.

NGO Dashboard
NGOs register by giving their organization details, such as name, email, phone number, and registration number. After logging in, NGOs can see all SOS and missing reports, understand where work is needed, and accept tasks that they want to handle. Once they accept a task, they can manage the work for that area. This system makes sure that the right number of people and resources reach the right locations and avoids overcrowding or duplication.

Admin Dashboard
Only selected users get access to the admin dashboard. Admin accounts are not open for public registration and are given manually. In this dashboard, admins can see all data including SOS and missing reports, details of all volunteers, team assignments, and the current work of each NGO. Admins manage all volunteer teams, decide which team goes where, and assign tasks accordingly. Admins also handle resource management and track donations. They can see who donated, how much, to which NGO or to the admin directly, and maintain full transparency.

Donation System
Anyone can donate through the website. Donors can choose to support a specific NGO or the overall admin-managed relief fund. The donation section shows all donation history clearly, including the name of the donor, the amount, the receiver (NGO or admin), and the date and time. This ensures complete transparency and trust


Checkpoints Explanation
Checkpoint 1: Landing Page (Completed at 1:00 PM)
We completed the full landing page, which includes the following sections:

Navbar for navigation links

Hero section introducing the website with a clear message

Key features section to highlight important functionalities

About this website section explaining the purpose and vision

Footer with important links and contact information

How it works popup button for quick guidance on the website’s process

Technology used section mentioning HTML, CSS, and JavaScript

The entire landing page was built using HTML for structure, CSS for styling, and JavaScript for interactivity.

Checkpoint 2: Login and Signup Forms (Completed at 2:12 PM)
We added both login and signup forms to the website.
At this stage, the forms were static — they were integrated into the site design but not yet connected to any backend authentication. This step focused on creating the user interface and collecting basic input data visually.

Checkpoint 3: Firebase Authentication Integration (Completed at 4:15 PM)
We implemented login and signup authentication using Firebase services.
In this step, both forms were connected to Firebase Authentication to allow real user registration and login functionality. This included creating user accounts securely and managing login sessions.

Checkpoint 4: Victim Dashboard and Realtime Database (Completed)
We completed the victim dashboard, where registered victims can submit SOS requests and view important information.
Additionally, we integrated Firebase Realtime Database to store victim data securely. Victims can now see maps, available resources, and active relief activities.

Checkpoint 5: Volunteer Authentication and Basic Dashboard UI (Completed)
We added authentication for volunteers so they can register and log in securely.
We also created a basic UI for the volunteer dashboard, where volunteers can view assigned tasks, submit reports, and check team details.
This initial design sets the foundation for further enhancements, including task assignment, resource tracking, and detailed volunteer management.


