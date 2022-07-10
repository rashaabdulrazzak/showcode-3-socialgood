import { Context, ContractPromiseBatch, logging, u128 } from 'near-sdk-as';
import { PostedMessage, messages,Project,projects,projectsIdList } from './model';

// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;
const XCC_GAS: u64 = 20_000_000_000_000;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text);
  // Adding the message to end of the persistent collection
  messages.push(message);
}
export function addProject(name: string,description:string): u32 {
  // Creating a new project and populating fields with our data
  const project = new Project(name,description);
  // Adding the project to projects collection
  projects.set(project.id, project);
  projectsIdList.push(project.id);
  return project.id
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}
export function getProjects(): Project[] {
  const len =  projectsIdList.length;
  
  const result = new Array<Project>(len);
  for(let i = 0; i < len; i++) {
    result[i] = projects.getSome(projectsIdList[i]);
  }
  return result;
}

export function getProjectById(id:u32):Project{
  const project = projects.getSome(id);
  return project
}

export function Donate(id:u32):string{
  const project = projects.getSome(id);
  assert(Context.attachedDeposit != u128.Zero ,'please attach some money ' );
  logging.log("before  Amount : " + (project.totalFund).toString());
  logging.log("Attached Amount : " + (Context.attachedDeposit).toString());
  
  project.totalFund = u128.add(project.totalFund,Context.attachedDeposit);
  projects.set(project.id,project)
  logging.log("updated Amount : " + (project.totalFund).toString());
  const to_self = Context.contractName
  

  // transfer earnings to owner then confirm transfer complete
 
  const to_beneficiary = ContractPromiseBatch.create(to_self);
  const amount_to_receive = Context.attachedDeposit;
  to_beneficiary.transfer(amount_to_receive);
  //const promise =  to_beneficiary.transfer(amount_to_receive)
  //promise.then(to_self).function_call("on_transfer_complete", '{}', u128.Zero, XCC_GAS)
  return "Donation done successfully"
}

