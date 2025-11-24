The Contact Us page allows visitors to get in touch with BARQ Systems through a CMS-managed form and to locate BARQ’s offices across the region via an interactive map.
The page includes two main sections:

Contact Us Form Section — for inquiries, demo requests, and general communication.

Our Offices Section — for showcasing BARQ’s regional office locations with synchronized map interaction.

User Stories

Story 1 — Contact Us Section

User Story:
As a visitor, I want to contact BARQ Systems by submitting a form so that my inquiry reaches the appropriate team.

CMS Controls & Limitations:

Background Image: Editable; image only.

Title: Editable; min 10, max 60 characters.

Subtext: Editable; min 100, max 250 characters.

Form Configuration:

Form Title: Editable; min 10, max 50 characters.

Subtext: Editable; min 50, max 150 characters.

Form Fields (Static):

Request Type (Dropdown — static options defined in CMS)

Full Name

Email

Country Code (Dropdown, default KSA)

Mobile Number

“How did you hear about BARQ Systems?” (Dropdown — static options defined in CMS)

Request Description (Text area)

Form Submission Flow:

Visitor fills out the form and clicks Submit.

CMS validates all required fields (email, mobile number format, and request type).

Data is saved in the CMS with timestamp and form ID.

Visitor sees a success message confirming successful submission.

Acceptance Criteria:

Form submission successfully stores data in CMS.

Success message displayed after submission.

CMS enforces field validations (character limits, format, required fields).

Background image, title, and texts display correctly.

Story 2 — Our Offices Section

User Story:
As a visitor, I want to view BARQ Systems’ office locations on a map and see each office’s contact information when I click on its location marker.

CMS Controls & Limitations:

Section Title: Editable; min 10, max 60 characters.

Offices (6 total): Each branch corresponds to one interactive card and one clickable map marker.

Static Elements (non-editable):

Country flag and name

Office title (e.g., “Riyadh Branch,” “Smart Village Office”)

Icons (location, phone, fax, email)

Editable Fields per Office:

Location: min 10, max 100 characters.

Phone Number: max 15 characters.

Fax: max 20 characters (optional).

Email: min 10, max 50 characters.(Optional)

Interactive Map & Card Behavior:

Clicking on a map marker updates and highlights the corresponding office card.

Navigating between cards (via arrow buttons) updates the highlighted point on the map.

The map zoom and highlight effects synchronize with the active card.

Offices appear in this fixed order:

Egypt — Maadi Technology Park

Egypt — Smart Village Office

Kingdom of Saudi Arabia — Riyadh Branch

Kingdom of Saudi Arabia — Jeddah Branch

United Arab Emirates — Dubai Branch

United Arab Emirates — Abu Dhabi Branch

Acceptance Criteria:

Section title and office data pull dynamically from CMS.

Each office displays correct location, phone (If applicable), fax (if applicable), and email.

Clicking a map marker updates the corresponding card and vice versa.

Highlight state visually identifies the active office on the map.

Section fully responsive and consistent across devices.

