# Guest list app ✅

In this application, you can add, delete, and mark a person as 'attending' on the guest list and save it to the database.

### TODO List 📝

- [x] Adding a guest using separate first name and last name fields
  - [x] The first name input needs to have a related label containing `First name`
  - [x] The last name input needs to have a related label containing `Last name`
  - [ ] A guest should be created upon pressing <kbd>Return</kbd> in the last name input
  - [x] After a guest is created, both fields need to be cleared again
  - [x] Newly created guests should be set as **not attending** by default
  - [x] Each guest (all content and form fields) should be contained inside a div element with the attribute `data-test-id="guest"`
- [x] Deleting a guest with a button that **either**:
  - [x] Contains the text `Remove`
  - [x] Has an `aria-label` attribute which starts with `Remove` (eg. `Remove <first name> <last name>`)
- [x] Setting a guest as "attending" by clicking on a checkbox
  - [x] The checkbox needs to have an `aria-label` which contains the text `attending` (eg. `<first name> <last name> attending status`) - the text can be uppercase or lowercase
  - [x] On the first click of the attending checkbox, the guest needs to be set to attending (the checkbox needs to be checked)
  - [ ] On the second click of the attending checkbox, the guest needs to be set to not attending (the checkbox needs to be unchecked)
- [x] Set up [this API](https://github.com/upleveled/express-guest-list-api-memory-data-store) and read the docs to understand how you can use it to store and retrieve data:
  - [x] Save any changes to the API
  - [x] Load the guest list from this API
- [ ] While the guest list is first loaded from the API (on page load):
  - [ ] Show a loading message containing the text `Loading...`
  - [ ] Disable the form fields

The default view should show all guests in the list.

Some features are similar to [this example](https://todomvc.com/examples/react/#/) - check this out to see how the app should generally behave.

## Stretch TODOs

- [ ] Button to delete all attending guests
- [ ] Filters:
  - [ ] Filter to show only non-attending guests
  - [ ] Filter to show only attending guests
  - [ ] Button to reset filters to again show all of the guests
- [ ] Allow editing first and last names of existing guests
- [ ] Store the guest list permanently
  - [ ] Set up a database with either ElephantSQL (PostgreSQL) or Firebase Cloud Firestore (NoSQL)
  - [ ] Fork the API repo and change it to use the database
- [ ] Allow for saving an "attending deadline" with each guest and if the current date is later than that deadline (and the guest hasn't been set to "attending"), display the guest differently
- [ ] Change the frontend and the API to allow for creating multiple events, each with their own name, location, and guest list
- [ ] Convert your frontend code to TypeScript (see [Adding TypeScript](https://create-react-app.dev/docs/adding-typescript/))
- [ ] Create a favicon that identifies your app: (see [Generating and Adding Favicons](https://learn.upleveled.io/courses/bootcamp-pern/modules/cheatsheet-design-ux/#generating-and-adding-favicons))
- [ ] Right after [creating your first (empty) Git commit](https://learn.upleveled.io/courses/bootcamp-pern/modules/cheatsheet-command-line/#4-create-and-push-an-initial-commit), create a new branch. Use this branch to [open a pull request on GitHub](https://learn.upleveled.io/courses/bootcamp-pern/modules/cheatsheet-git-github/#opening-pull-requests)

### How does the application work? 🧐

1. It's written in the `Sass module` and `React` component.
2. An API is used to save and get information from a database.
3. `Fetch` is used to get data.
4. `useEffect` is used to trigger actions.
