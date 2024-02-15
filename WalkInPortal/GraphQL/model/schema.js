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
        reffered_name: String
        is_email_notification: Int
        user_job_roles_preference: UserJobRolesPreference!
        educational_qualifications: EducationalQualifications!
        fresher_professional_qualifications: FresherProfessionalQualifications!
        experienced_professional_qualifications: ExperiencedProfessionalQualifications!
        user_applied_job_details: [UserAppliedJobDetails!]
    }

    type EducationalQualifications {
        id: ID!
        aggreagate_percentage: Int!
        year_of_passing: Int!
        college_location: String!
        other_college_name: String!
        qualifications: Qualifications!
        streams: Streams!
        colleges: Colleges!
    }

    type FresherProfessionalQualifications {
        familiar_technologies: FamiliarTechnologies!
        other_familiar_technologies: String
        test_appearence: Int!
        test_appearence_role: String
    }

    type ExperiencedProfessionalQualifications {
        year_of_experience: Int!
        current_ctc: Int!
        expected_ctc: Int!
        experience_technologies: ExperienceTechnologies!
        other_experience_technologies: String!
        familiar_technologies: FamiliarTechnologies!
        other_familiar_technologies: String!
        on_notice_period: Int!
        notice_period_end_date: String
        notice_period_duration: String
        test_appearence: Int!
        test_appearence_role: String
        users: Users!
    }


    type UserJobRolesPreference {
        job_roles: [JobRoles!]!
    }

    type JobCardJobRolesPreference {
        job_roles: [JobRoles!]!
    }

    type UserAppliedJobRolesPreference  {
        job_roles: [JobRoles!]!
    }

    type UserAppliedJobDetails {
        id: ID!
        resume_link: Int!
        time_slots: TimeSlots!
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
        job_card_job_roles_preference: JobCardJobRolesPreference!
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
        getUsers: [Users]
        getUser(id: ID!): Users
        getJobs: [JobCard]
        getJob(id: ID!): JobCard
        getJobRoles: [JobRoles]
        getQualifications: [Qualifications]
        getColleges: [Colleges]
        getStreams: [Streams]
    }
`;