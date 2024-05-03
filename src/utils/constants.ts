export const REFERRAL_ROWS_DATA=[
    {
        "patient_name": "John Doe",
        "dob": "1990-05-15",
        "referral_date": "2024-04-26",
        "payer": "XYZ Insurance",
        "uuid":"3iiioiii",
    },
    {
        "patient_name": "Jane Smith",
        "dob": "1985-08-22",
        "referral_date": "2024-04-25",
        "payer": "ABC Healthcare",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Michael Johnson",
        "dob": "1978-11-10",
        "referral_date": "2024-04-24",
        "payer": "DEF Medical",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
        
    },
    {
        "patient_name": "Emily Davis",
        "dob": "1995-03-29",
        "referral_date": "2024-04-23",
        "payer": "GHI Insurance",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "William Brown",
        "dob": "1982-07-17",
        "referral_date": "2024-04-22",
        "payer": "JKL Health",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Olivia Wilson",
        "dob": "1989-09-08",
        "referral_date": "2024-04-21",
        "payer": "MNO Healthcare",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "James Taylor",
        "dob": "1973-12-04",
        "referral_date": "2024-04-20",
        "payer": "PQR Insurance",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Sophia Martinez",
        "dob": "1992-02-18",
        "referral_date": "2024-04-19",
        "payer": "STU Medical",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Daniel Anderson",
        "dob": "1987-06-12",
        "referral_date": "2024-04-18",
        "payer": "VWX Health",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Isabella Thomas",
        "dob": "1980-10-31",
        "referral_date": "2024-04-17",
        "payer": "YZA Insurance",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Liam Hernandez",
        "dob": "1997-01-25",
        "referral_date": "2024-04-16",
        "payer": "BCD Healthcare",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Mia Nelson",
        "dob": "1975-05-07",
        "referral_date": "2024-04-15",
        "payer": "EFG Medical",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Benjamin Adams",
        "dob": "1993-08-03",
        "referral_date": "2024-04-14",
        "payer": "HIJ Insurance",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Charlotte Evans",
        "dob": "1984-04-12",
        "referral_date": "2024-04-13",
        "payer": "KLM Health",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    },
    {
        "patient_name": "Aiden Garcia",
        "dob": "1988-11-28",
        "referral_date": "2024-04-12",
        "payer": "NOP Healthcare",
        "uuid":"38a46fa3-c9c7-4454-a136-a6d28edd7176",
    }
]

export const REFERRAL_DETAIL_DATA={
    // Referral Receipt Date
    patient_name:{
     key:"Patient Name",
     value:"", 
     editable: false,
     label:'patient_name',                                                                           

    },
    dob:{
        key:"Patient Date of Birth",
        value:"",
        editable: false,
        label:'dob',    
    },
    practice_name:{
        key:"Practice Name",
        value:"",
        editable: false,
        label:'practice_name',

    },
    assigned_provider:{
        key:"Assigned Provider",
        value:"",
        editable: false,
        label:'assigned_provider',
    },
    "specialty":{
        key:"Specialty",
        value:"",
        editable: false,
        label:'specialty'
    },
    // "Referring Party" missing in backend data
    "referral_description":{
        key:"Referral Description",
        value:"",
        editable: false,
        label:'referral_description'
    
    },
     "preop_consult_scheduled_date":{
        key:"Scheduled Consult Date",
        value:"",
        editable: true,
        label:'preop_consult_scheduled_date'
     },
     "preop_consult_completed":{
        key:"Did patient show up to pre-op consult?",
        value:"",
        editable: true,
        label:'preop_consult_completed'
     },
     preop_consult_notes:{
        key:"Consult Notes",
        value:"",
        editable: true,
        label:'preop_consult_notes',
     },
     op_scheduled_date:{
      key:"Scheduled Surgery Date",
      value:"",
      editable: true,
      label:'op_scheduled_date',
     },

     intended_procedure:{
        key:"Intended Procedure (CPT Codes)",
        value:"",
        editable: true,
        label:'intended_procedure'
     },
     facility:{
        key:"Facility",
        value:"",
        editable: true,
        label:'facility'
     },
     travel_required:{
        key:"Is Travel Required?",
        value:"",
        editable: true,
        label:'travel_required'
     },
     op_completed:{
        key:"Was the surgery completed?",
        value:"",
        editable: true,
        label:'op_completed',
     },
     preop_consult_attachment:{
        key:"preop-consult notes.pdf",
        value:"",
        editable: true,
        label:'preop_consult_attachment'
       
     },
     op_notes_attachment:{
        key:"operating notes.pdf",
        value:"",
        editable: true,
        label:'op_notes_attachment'
     }

     // 3 Procedure Notes
     // 4 Post Op Consult Date
     // 5 Did patient show up to post-op consult?
     // 6 Post Op Consult Notes    

}

export const REFERRAL_HEADER_DATA=[
    "Patient Name",
    "Date of Birth",
    "Referral Date",
    "Payer",
]

export const  CLAIMS_HEADER_DATA=[
    "Patient Name",
    "Date of Service",
    "CPT Code",
    "Payment Amount",
    "Payment Date",
    "Provider Name",
    "Payer",
    "Claim Status",
]
export const  EMPLOYER_HEADER_DATA=[
    "Employer Name",
    "Payer",
]