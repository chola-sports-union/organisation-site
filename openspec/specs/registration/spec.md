# Registration Specification

This specification documents the current behavior of the Athlete Application / Registration system (the **Join** page) of the Chola FC web application.

---

## Purpose
The Registration feature allows prospective athletes (or their parents/guardians) to apply for training programs at Chola FC. It intakes personal details, contact details, program selections, and transitions to a success state on submission.

---

## Requirements

### Requirement: Personal Information Intake
The registration form **SHALL** collect the following personal details:
*   First Name (Required)
*   Last Name (Required)
*   Date of Birth (Required)
*   Gender (Required: Male, Female, or Other)

### Requirement: Contact Information Intake
The registration form **SHALL** collect contact details:
*   Email Address (Required)
*   Phone Number (Required)
*   Full Address (Required)

### Requirement: Parent/Guardian Intake for Minors
*   **IF** the applicant is under 18 years of age,
*   **THEN** the form **SHOULD** collect:
    *   Parent/Guardian Name
    *   Parent/Guardian Phone Number

### Requirement: Program Selection
The registration form **SHALL** collect training preferences:
*   Program Name (Required: Junior Development, Youth Elite, Professional Track, or Goalkeeper Specialist)
*   Football Experience Level (Required: Beginner, Intermediate, Advanced, or Expert)

### Requirement: Additional Information
The registration form **MAY** collect supplementary details:
*   School/College Name
*   Medical Conditions or Allergies
*   Statement of Purpose (Why they want to join Chola FC)

### Requirement: Form Submission Transition
*   **WHEN** the user submits the form with all required fields filled,
*   **THEN** the form **SHALL** be hidden, and a success view displaying "Registration Submitted!" **SHALL** be displayed.
*   **AND** the success view **SHALL** offer a "Submit Another Registration" option to reset the form.

---

## Scenarios

### Scenario: Successful Submission
*   **GIVEN** a user is on the Join page and the registration form is visible
*   **WHEN** they fill all required inputs (First Name, Last Name, Date of Birth, Gender, Email, Phone, Address, Program, and Experience) and submit
*   **THEN** the form transitions to the success view:
    *   Hides the input fields.
    *   Shows a checkmark with the success confirmation.
    *   Displays the "Submit Another Registration" button.

### Scenario: Resetting the Registration Form
*   **GIVEN** a user has submitted an application and is viewing the success confirmation view
*   **WHEN** they click the "Submit Another Registration" button
*   **THEN** the success view is hidden, the inputs are reset, and the registration form is shown again.
