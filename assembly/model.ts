import { context, u128, PersistentVector, PersistentMap, RNG, PersistentUnorderedMap } from "near-sdk-as";

/** 
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedMessage {
  premium: boolean;
  sender: string;
  constructor(public text: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const messages = new PersistentVector<PostedMessage>("m");

@nearBindgen
export class Project {
   id: u32;
   name: string;
   description: string;
   totalFund: u128 ;
   receivedAmount: u128;
  constructor (name: string, description:string) {
    const rng = new RNG<u32>(1, u32.MAX_VALUE);
    const roll = rng.next();
    this.id = roll;
    this.name= name;
    this.description = description;
    this.totalFund = u128.Zero ;
    this.receivedAmount = context.attachedDeposit; 
  }
}

export const projects = new PersistentMap<u32,Project>("p");
export const projectsIdList = new PersistentVector<u32>("pl");
