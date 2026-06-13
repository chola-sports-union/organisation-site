# Contact Specification

This specification documents the current behavior of the Contact page, including information panels, the message form, and the FAQ section of the Chola FC web application.

---

## Purpose
The Contact page enables users to find Chola FC's physical location, contact numbers, email addresses, review frequently asked questions, and submit dynamic inquiry messages.

---

## Requirements

### Requirement: Contact Information Display
The contact page **SHALL** display:
*   Email support and admissions addresses.
*   Phone numbers for inquiry.
*   Location address in Chennai.
*   Weekly working hours for the facility.

### Requirement: Contact Message Form
The contact form **SHALL** collect:
*   Sender Name (Required)
*   Email Address (Required)
*   Phone Number (Optional)
*   Subject (Required)
*   Message content (Required)

### Requirement: Contact Form Submission Transition
*   **WHEN** the user submits the form with all required fields filled,
*   **THEN** the submit button text **SHALL** change to "Message Sent!" and become disabled.
*   **AND** a confirmation text saying "Thank you! We'll get back to you within 24 hours." **SHALL** be displayed.
*   **AND** the form status **SHALL** automatically reset to default after 3 seconds.

### Requirement: FAQ Section
The FAQ section **SHALL** display standard questions and answers regarding:
*   Age groups accepted (10-25 years).
*   Experience requirements (beginners welcome).
*   Trial sessions (complimentary session offered).
*   Required training equipment.
*   Transportation services.

---

## Scenarios

### Scenario: Successful Inquiry Submission
*   **GIVEN** a user is on the Contact page
*   **WHEN** they fill in Name, Email, Subject, and Message, and click "Send Message"
*   **THEN** the form enters the submitted state:
    *   The send button is disabled and reads "Message Sent!".
    *   The confirmation notice is shown below the form.
*   **WHEN** 3 seconds have passed
*   **THEN** the form resets back to its default editable state.
