export class User{
    public id!: number;
    public userId!:string ;
    public  firstName!:string;
    public  lastName!:string;
    public  username!:string;
    public  password!:string;
    public  email!:string;
    public  profileImageUrl!:string;
    public  lastLoginDate!: Date;
    public  lastLoginDateDisplay!: Date;
    public joinDate!: Date;
    public role!: string; 
    public  authorities: [] | undefined;
    public isActive!: boolean;
    public isNotLocked!: boolean;

    constructor(){
        
    }

   

}