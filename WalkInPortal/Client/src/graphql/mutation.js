import { gql } from "@apollo/client";

export const LoginMutation = gql`
    mutation LoginMutation($loginFormData: Login!) {
        login(loginFormData: $loginFormData) {
            accessToken
            userID
            roles
        }
    }
`;

export const RegisterMutation = gql`
    mutation RegistrationMutation($registrationFormData: Register!) {
        register(registrationFormData: $registrationFormData)
    }
`;

export const ApplyJobMutation = gql`
    mutation ApplyJobMutation($appliedFormData: ApplyJob!) {
        applyJob(appliedFormData: $appliedFormData)
    }
`;