export const requestFormSteps = [
  {
    title: "Account Request",
    fields: [
      {
        type: "text" as const,
        name: "first_name",
        label: "First Name",
        placeholder: "Enter first name",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        type: "text" as const,
        name: "last_name",
        label: "Last Name",
        placeholder: "Enter last name",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        type: "email" as const,
        name: "email",
        label: "Email Address",
        placeholder: "john.doe@example.com",
        validation: {
          required: "Email address is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email address",
          },
        },
      },
      {
        type: "text" as const,
        name: "phone",
        label: "Phone Number",
        placeholder: "0700123456",
        validation: {
          required: "Phone number is required",
          pattern: {
            value: /^(\+256|0)[0-9]{9}$/,
            message: "Please enter a valid Ugandan phone number",
          },
        },
      },
    ],
  },
];
