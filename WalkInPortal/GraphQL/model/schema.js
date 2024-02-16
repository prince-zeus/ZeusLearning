export const gql = String.raw

export const typeDefs = gql`
    type Users{
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        phone_number: String!
        profile_image: String
        resume: String
        portfolio_url: String
        preferred_job_roles: [JobRoles!]!
        reffered_name: String
        is_email_notification: Int
        educational_qualifications: EducationalQualifications!
        fresher_professional_qualifications: FresherProfessionalQualifications
        experienced_professional_qualifications: ExperiencedProfessionalQualifications
        user_applied_job_details: [UserAppliedJobDetails!]
    }

    type EducationalQualifications {
        id: ID!
        aggreagate_percentage: Int!
        year_of_passing: Int!
        qualifications_id: Int!
        qualifications: Qualifications!
        streams_id: Int!
        streams: Streams!
        colleges_id: Int!
        colleges: Colleges!
        other_college_name: String!
        college_location: String!
    }

    type FresherProfessionalQualifications {
        users_id: Int!
        familiar_technologies: [Technology!]!
        other_familiar_technologies: String
        test_appearence: Int!
        test_appearence_role: String
    }

    type ExperiencedProfessionalQualifications {
        users_id: Int!
        year_of_experience: Int!
        current_ctc: Int!
        expected_ctc: Int!
        experience_technologies: [Technology!]!
        other_experience_technologies: String!
        familiar_technologies: [Technology!]!
        other_familiar_technologies: String!
        on_notice_period: Int!
        notice_period_end_date: String
        notice_period_duration: String
        test_appearence: Int!
        test_appearence_role: String
    }

    type UserJobRolesPreference {
        job_roles: [JobRoles!]
    }

    type JobCardJobRolesPreference {
        job_roles: [JobRoles!]
    }

    type UserAppliedJobRolesPreference  {
        job_roles: [JobRoles!]
    }

    type UserAppliedJobDetails {
        id: ID!
        resume_link: String!
        time_slots_id: Int!
        time_slots: TimeSlots!
        user_applied_job_roles_preference: [JobRoles!]!
    }

    type JobCard {
        id: ID!
        job_title: String!
        dateandtime: String!
        location: String!
        general_instructions: String
        instructions_for_the_exam: String
        minimum_system_requirements: String
        process: String
        job_card_job_roles_preference: [JobRoles!]!
        time_slots: [TimeSlots!]!
        tags: [JobTags!]
    }

    type JobTags {
        tag: String!
    }

    type JobRoles {
        id: ID!
        job_role_icon: String!
        job_role_title: String!
        gross_compensation_package: String
        role_description: String
        requirements: String
    }

    type Technology {
        id: ID!
        technology: String!
    }

    type FamiliarTechnologies {
        id: ID!
        technology: Technology!
    }

    type ExperienceTechnologies {
        id: ID!
        technology: Technology!
    }

    type Qualifications {
        id: ID!
        qualification_name: String!
    }

    type Colleges {
        id: ID!
        college_name: String!
    }

    type Streams {
        id: ID!
        stream_name: String!
    }

    type TimeSlots {
        id: ID!
        time: String!
    }
      
    type Query{
        users: [Users]
        user(id: ID!): Users
        jobs: [JobCard!]
        job(id: ID!): JobCard
        appliedJobs: [UserAppliedJobDetails!]
        appliedJob(id: ID!): UserAppliedJobDetails
        jobRoles: [JobRoles]
        qualifications: [Qualifications]
        colleges: [Colleges]
        streams: [Streams]
        technology: [Technology]
        tags: [JobTags]
    }

    input Login {
        email: String!
        pwd: String!
    }

    type LoginVerify {
        userID: Int 
        accessToken: String 
        roles: [Int]
    }

    input Register {
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        phone_number: String!
        profile_image: String
        resume: String
        portfolio_url: String
        preferred_job_roles: [Int!]! # Here I have to check which type fits best JobRoles Or Int
        reffered_name: String
        is_email_notification: Int
        aggreagate_percentage: Int!
        year_of_passing: Int!
        qualifications_id: Int!
        streams_id: Int!
        colleges_id: Int!
        other_college_name: String!
        college_location: String!
        year_of_experience: Int!
        current_ctc: Int!
        expected_ctc: Int!
        experience_technologies: [Int!]! # Here I have to check which type fits best Technology Or Int
        other_experience_technologies: String!
        familiar_technologies: [Int!]! # Here I have to check which type fits best Technology Or Int
        other_familiar_technologies: String!
        on_notice_period: Int!
        notice_period_end_date: String
        notice_period_duration: String
        test_appearence: Int!
        test_appearence_role: String
        applicantType: String!
    }

    input ApplyJob {
        resume_link: String!, 
        time_slots_id: Int!,
        selected_job_roles: [Int!]!
        users_id: Int!
    }

    type Mutation {
        login(loginFormData: Login): LoginVerify
        register(registrationFormData: Register): String
        applyJob(appliedFormData: ApplyJob): Int
    }
`;