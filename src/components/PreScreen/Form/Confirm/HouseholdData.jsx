import { DataStore } from '@aws-amplify/datastore';
import { HouseholdMember } from '../../../../models';

export async function HouseholdData() {
  const householdMembers = await DataStore.query(HouseholdMember);

  return (
    <>
      {householdMembers.map((member) => (
        <div key={member.id}>
          <p>Name: {member.name}</p>
          <p>Last Name: {member.lastName}</p>
          <p>Date of Birth: {member.dateOfBirth}</p>
          <p>Sex: {member.sex}</p>
          <p>Relationship: {member.relationship}</p>
          <p>Is Coapplicant: {String(member.isCoapplicant)}</p>
        </div>
      ))}
    </>
  );
}
