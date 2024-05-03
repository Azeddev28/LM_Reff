export const REFERRAL_DETAIL_DATA = {
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
    practice_name: {
        key: "Practice Name",
        value: "",
        editable: false,
        label:'assigned_provider',
    },
    assigned_provider: {
        key: "Assigned Provider",
        value: "",
        editable: false,
    },
    specialty: {
        key: "Specialty",
        value: "",
        editable: false,
        label:'specialty'
    },
    // "Referring Party" missing in backend data
    referral_description: {
        key: "Referral Description",
        value: "",
        editable: false,
        label:'referral_description'
    
    },
    preop_consult_scheduled_date: {
        key: "Scheduled Consult Date",
        value: "",
        editable: true,
        label:'preop_consult_scheduled_date'
     },
     preop_consult_completed:{
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

export const REFERRAL_HEADER_DATA = [
    {
        'key': 'patient_name',
        'display': "Patient Name",
        'sortKey': 'patient_full_name'
    },
    {
        'key': 'dob',
        'display': "Date of Birth",
        'sortKey': 'dob'
    },
    {
        'key': 'referral_date',
        'display': 'Referral Date',
        'sortKey': 'date_created'
    },
    {
        'key': 'payer',
        'display': 'Payer',
        'sortKey': 'convener_full_name'
    }
]

export const CLAIMS_HEADER_DATA = [
    {
        'key': 'patient_name',
        'display': "Patient Name",
        'sortKey': 'patient_full_name'
    },
    {
        'key': 'date_of_service',
        'display': "Date of Service",
        'sortKey': 'date_of_service'
    },
    {
        'key': 'cpt_code',
        'display': "CPT Code",
        'sortKey': 'cpt_code'
    },
    {
        'key': 'payment_amount',
        'display': "Payment Amount",
        'sortKey': 'amount_due_to_provider'
    },
    {
        'key': 'payment_date',
        'display': "Payment Date",
        'sortKey': 'provider_payment_date'
    },
    {
        'key': 'provider_name',
        'display': "Provider Name",
        'sortKey': 'provider_name'
    },
    {
        'key': 'payer',
        'display': "Payer",
        'sortKey': 'convener_full_name'
    },
    {
        'key': 'claim_status',
        'display': "Claim Status",
        'sortKey': 'claim_status'
    }

]
export const EMPLOYER_HEADER_DATA = [
    {
        'key': 'employer_name',
        'display': "Employer Name",
        'sortKey': 'name'
    },
    {
        'key': 'employer_name',
        'display': "Employer Name",
        'sortKey': 'convener_full_name'
    }
]