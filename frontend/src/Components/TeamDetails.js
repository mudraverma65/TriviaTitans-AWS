import React, { useState } from 'react';

const TeamDetails = ({ members, adminEmailID }) => {
  const [teamMembers, setTeamMembers] = useState(members);

  const handlePromoteAdmin = (emailID) => {
    // Check if the emailID is the admin emailID
    if (emailID === adminEmailID) {
      alert('You cannot promote the admin.');
      return;
    }

    // Promote the user to admin by updating the teamMembers state
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.emailID === emailID ? { ...member, isAdmin: true } : member
      )
    );
  };

  const handleRemoveMember = (emailID) => {
    // Check if the emailID is the admin emailID
    if (emailID === adminEmailID) {
      alert('You cannot remove the admin.');
      return;
    }

    // Remove the member from the teamMembers state
    setTeamMembers((prevMembers) =>
      prevMembers.filter((member) => member.emailID !== emailID)
    );
  };

  return (
    <div>
      {teamMembers.map((member) => (
        <div key={member.emailID}>
          <span>{member.emailID}</span>
          {adminEmailID === member.emailID && (
            <>
              <button onClick={() => handlePromoteAdmin(member.emailID)}>
                Promote to Admin
              </button>
              <button onClick={() => handleRemoveMember(member.emailID)}>
                Remove Member
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamDetails;
