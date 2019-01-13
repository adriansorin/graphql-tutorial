import gql from 'graphql-tag';

export const listChannelsQuery = gql`
    {
        channels {
            id
            name
        }
    }
`;
