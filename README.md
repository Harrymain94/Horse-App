# Horse App

A small React + TypeScript application for managing horse records.

The application allows users to view, create, and edit horses through a simple CRUD interface connected to a REST API.

---

## Features

* View a list of horses
* Create a new horse
* Edit an existing horse
* Client-side pagination
* Simple form interface for horse details

---

## Tech Stack

* React
* TypeScript
* Basic CSS styling

---

## Running the Application

### 1. Install dependencies

```
npm install
```

### 2. Start the application

```
npm start
```

The app will run at:

```
http://localhost:5173
```

---

## API Requirements

The frontend expects an API running locally with the following endpoints:

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | `/horse`      | Retrieve all horses      |
| POST   | `/horse`      | Create a new horse       |
| PUT    | `/horse/{id}` | Update an existing horse |

The API is expected to run at:

```
http://localhost:3016
```

---

## Notes

* Pagination is implemented client-side.
* Styling is intentionally minimal to focus on application functionality.
* See `ASSUMPTIONS.md` for implementation assumptions and limitations.

## Testing Approach

Due to the time constraints of the exercise, automated tests were not implemented. However, deliberate manual testing was performed to ensure the core functionality behaves as expected.

### Key scenarios tested

**Horse creation**

* Creating a new horse successfully updates the Horse List state.
* Newly created horses appear in the correct paginated position.
* Creating new horses correctly updates pagination.

**Horse updates**

* Editing an existing horse updates the correct item in the list.
* Updates persist correctly in the UI after saving.

**Pagination**

* Pagination correctly limits the list to 10 horses per page.
* When the number of horses exceeds 10, additional pages appear.
* Navigating between pages displays the correct subset of horses.

**Edge cases considered**

* Creating a horse without an existing `id`.
* Updating a horse while pagination is active.
* Ensuring the UI state updates correctly when horses are added or modified.

### Future testing improvements

With additional time, automated tests would be added for:

* Component rendering and interactions (e.g., form submission, pagination controls).
* Edge cases such as API failures or invalid input.

## Post-Submission Improvement

After submitting the initial solution, a small UX issue was identified in the form validation behaviour.

Previously, when validation failed the **Save** button became disabled, which prevented the user from correcting the form and immediately attempting to resubmit. This behaviour was adjusted so that the button remains enabled while validation feedback is displayed.

This change was made to better align with common UX patterns for form validation.
