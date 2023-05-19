# Guest list app ✅

<img width="450" alt="Screenshot 2023-05-19 at 21 31 30" src="https://github.com/butterfly-123/react-guest-list/assets/58802893/edd8c3be-e33a-42bc-a609-d43bdc3c46c1">

This application allows you to perform various actions on the guest list, such as adding, deleting, marking a person as 'attending' or 'not attending' and subsequently saving the updated information to the database.

### TODO List 📝

- [x] Adding a guest using separate first name and last name fields
  - [x] The first name input needs to have a related label containing `First name`
  - [x] The last name input needs to have a related label containing `Last name`
  - [x] A guest should be created upon pressing <kbd>Return</kbd> in the last name input
  - [x] After a guest is created, both fields need to be cleared again
  - [x] Newly created guests should be set as **not attending** by default
  - [x] Each guest (all content and form fields) should be contained inside a div element with the attribute `data-test-id="guest"`
- [x] Deleting a guest with a button that **either**:
  - [x] Contains the text `Remove`
  - [x] Has an `aria-label` attribute which starts with `Remove` (eg. `Remove <first name> <last name>`)
- [x] Setting a guest as "attending" by clicking on a checkbox
  - [x] The checkbox needs to have an `aria-label` which contains the text `attending` (eg. `<first name> <last name> attending status`) - the text can be uppercase or lowercase
  - [x] On the first click of the attending checkbox, the guest needs to be set to attending (the checkbox needs to be checked)
  - [x] On the second click of the attending checkbox, the guest needs to be set to not attending (the checkbox needs to be unchecked)
- [x] Set up this API and read the docs to understand how you can use it to store and retrieve data:
  - [x] Save any changes to the API
  - [x] Load the guest list from this API
- [x] While the guest list is first loaded from the API (on page load):
  - [x] Show a loading message containing the text `Loading...`
  - [x] Disable the form fields

### Stretch TODOs

- [x] Button to delete all attending guests
- [x] Filters:
  - [x] Filter to show only non-attending guests
  - [x] Filter to show only attending guests
  - [x] Button to reset filters to again show all of the guests

### About what the aplicaton is base on? 🧐

1. It's written in the `Sass module` and `React` component.
2. An API is used to save and get information from a database.
3. `Fetch` is used to get data.
4. `useEffect` is used to trigger actions.

### How to open it? 

To access the application, you can `clone` it and initiate it by executing the command `pnpm start`.

Additionally, the code can be located at this [link](https://codesandbox.io/s/github/butterfly-123/react-guest-list).
