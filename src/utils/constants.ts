import { Label } from "@mui/icons-material";

export const REFERRAL_DETAIL_DATA = {
  date_created: {
    key: "Referral Receipt Date",
    value: "",
    editable: false,
    label: "date_created",
  },
  patient_name: {
    key: "Patient Name",
    value: "",
    editable: false,
    label: "patient_name",
  },
  dob: {
    key: "Patient Date of Birth",
    value: "",
    editable: false,
    label: "dob",
  },
  practice_name: {
    key: "Practice Name",
    value: "",
    editable: false,
    label: "practice_name",
  },
  assigned_provider: {
    key: "Assigned Provider",
    value: "",
    editable: false,
    label: "assigned_provider",
  },
  specialty: {
    key: "Specialty",
    value: "",
    editable: false,
    label: "specialty",
  },
  referring_party: {
    key: "Referring Party",
    value: "",
    editable: false,
    label: "referring_party",
  },
  referral_description: {
    key: "Referral Description",
    value: "",
    editable: false,
    label: "referral_description",
  },
  practice_notes: {
    key: "Practice Notes",
    value: "",
    editable: true,
    label: "practice_notes",
  },
  initial_consultation_date: {
    key: "Initial Consultation Date",
    value: "",
    editable: true,
    label: "initial_consultation_date",
    datePicker: true,
  },
  initial_consult_completed: {
    key: "Initial Consult Completed",
    value: "",
    editable: true,
    label: "initial_consult_completed",
  },
  initial_consult_format: {
    key: "Visit Type",
    value: "",
    editable: true,
    label: "initial_consult_format",
    isDropDown: true,
    datatype:'visitType'
  },
  initial_consult_notes: {
    key: "Initial Consult Notes",
    value: "",
    editable: true,
    label: "initial_consult_notes",
  },
  preop_consult_scheduled_date: {
    key: "Scheduled Pre-Op Consult Date",
    value: "",
    editable: true,
    label: "preop_consult_scheduled_date",
    datePicker: true,
  },
  preop_consult_format: {
    key: "Visit Type",
    value: "",
    editable: true,
    label: "preop_consult_format",
    isDropDown: true,
    datatype:'visitType'
  },
  preop_consult_completed: {
    key: "Did patient show up to pre-op consult?",
    value: "",
    editable: true,
    label: "preop_consult_completed",
  },
  preop_consult_notes: {
    key: "Pre-op Consult Notes",
    value: "",
    editable: true,
    label: "preop_consult_notes",
  },
  op_scheduled_date: {
    key: "Scheduled Surgery Date",
    value: "",
    editable: true,
    label: "op_scheduled_date",
    datePicker: true,
  },
  postop_consult_format: {
    key: "Visit Type",
    value: "",
    editable: true,
    label: "postop_consult_format",
    isDropDown: true,
    datatype:'visitType'
  },
  intended_procedure: {
    key: "Intended Procedure (CPT Codes)",
    value: "",
    editable: true,
    label: "intended_procedure",
  },
  facility: {
    key: "Facility",
    value: "",
    editable: true,
    label: "facility",
  },
  overnight_stay_required: {
    key: "Is Overnight Stay Required?",
    value: "",
    editable: true,
    label: "overnight_stay_required",
  },
  departure_date: {
    key: "Departure Date",
    value: "",
    editable: true,
    label: "departure_date",
    inVisible:true,
    datePicker: true,
  },
  return_date: {
    key: "Return Date",
    value: "",
    editable: true,
    label: "return_date",
    inVisible:true,
    datePicker: true,
  },
  op_completed: {
    key: "Was the surgery completed?",
    value: "",
    editable: true,
    label: "op_completed",
  },
  op_notes: {
    key: "Procedure Notes",
    value: "",
    editable: true,
    label: "op_notes",
  },
  post_op_consult_date: {
    key: "Post Op Consult Date",
    value: "",
    editable: true,
    label: "post_op_consult_date",
    datePicker: true,
  },
  post_op_consult_completed: {
    key: "Did patient show up to post-op consult?",
    value: "",
    editable: true,
    label: "post_op_consult_completed",
  },
  post_op_consult_notes: {
    key: "Post Op Consult notes",
    value: "",
    editable: true,
    label: "post_op_consult_notes",
  },
  referral_attachments: {
    key: "",
    value: [],
    editable: true,
    label: "referral_attachments",
  },
  is_cancelled: {
    key: "",
    value: "",
    editable: true,
    label: "is_cancelled",
  },
};

export const REFERRAL_HEADER_DATA = [
  {
    key: "patient_name",
    display: "Patient Name",
    sortKey: "patient__name",
  },
  {
    key: "dob",
    display: "Date of Birth",
    sortKey: "dob",
  },
  {
    key: "referral_date",
    display: "Referral Date",
    sortKey: "date_created",
  },
  {
    key: "payer",
    display: "Payer",
    sortKey: "convener__name",
  },
  {
    key: "referral_description",
    display: "Referral Description",
    sortKey: "ref__desc",
  },
  {
    key: "date_updated",
    display: "Last Updated",
    sortKey: "last_updated",
  },
];

export const CLAIMS_HEADER_DATA = [
  {
    key: "patient_name",
    display: "Patient Name",
    sortKey: "patient__name",
  },
  {
    key: "date_of_service",
    display: "Date of Service",
    sortKey: "date_of_service",
  },
  {
    key: "cpt_code",
    display: "CPT Code",
    sortKey: "cpt_code",
  },
  {
    key: "payment_amount",
    display: "Payment Amount",
    sortKey: "amount_due_to_provider",
  },
  {
    key: "payment_date",
    display: "Payment Date",
    sortKey: "provider_payment_date",
  },
  {
    key: "provider_name",
    display: "Provider Name",
    sortKey: "provider_name",
  },
  {
    key: "payer",
    display: "Payer",
    sortKey: "convener__name",
  },
  {
    key: "claim_status",
    display: "Claim Status",
    sortKey: "claim_status",
  },
];
export const EMPLOYER_HEADER_DATA = [
  {
    key: "employer_name",
    display: "Employer Name",
    sortKey: "name",
  },
  {
    key: "convener__name",
    display: "Payer",
    sortKey: "convener__name",
  },
];
