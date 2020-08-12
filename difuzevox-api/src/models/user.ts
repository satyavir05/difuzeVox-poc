export interface Users {
    id: number;
    name: string;
}

export interface user {
    id: number;
    userName: string;
    userEmail: string;
    privilegeLevel :number;
    createdDate: Date;
    createdBy: string;
    ModifiedBy: string;
    ModifiedDate: Date;
    isActive: boolean;
}

export interface project {
    projectName: string;
    projectOwner: string;
    startTC : Date;
    voiceSpeed : number;
    languageAndRegion: string;
    neuralVoice: string;
    appliedLexicon :string
    state:string;
    isActive :boolean;
    createdDate: Date;
    createdBy: string;
    ModifiedBy: string;
    ModifiedDate: Date;
}