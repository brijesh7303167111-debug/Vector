import mongoose from "mongoose";


const AddressSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  country: String,
  postalCode: String
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  level: { type: String, enum: ['PhD','PostGraduate','Graduate','Diploma','12th','10th','Other'] },
  degree: String,           // e.g., "B.Tech Computer Science"
  institution: String,      // e.g., "IIT Bombay"
  fieldOfStudy: String,     // e.g., "Computer Science"
  startDate: Date,
  endDate: Date,
  gradeOrPercent: String,
}, { _id: true });

const ExperienceSchema = new mongoose.Schema({
  title: String,            // e.g., "Software Engineer"
  company: String,          // employer name
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional ref if company is registered
  location: String,
  startDate: Date,
  endDate: Date,            // null if currently working
  currentlyWorking: { type: Boolean, default: false },
  responsibilities: String, // free text or structured bullets
}, { _id: true });

const CertificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  issueDate: Date,
  expiryDate: Date,
  credentialId: String,
  credentialUrl: String
}, { _id: true });

const CandidateProfileSchema = new mongoose.Schema({
  headline: String,                 // short tagline
  summary: String,                  // bio / professional summary
  location: AddressSchema,
  phone: String,
  website: String,                  // portfolio
  social: {                          // optional social links
    linkedin: String,
    github: String,
    twitter: String,
    other: [String]
  },
  education: [EducationSchema],     // array of educations (grad, postgrad, 12, 10th...)
  experience: [ExperienceSchema],   // career history
  certifications: [CertificationSchema],
  achievements: [String],           // list of achievements
  keySkills: [String],              // list of skills (strings or tag refs)
  openToWork: {                     // open to job opportunities
    type: Boolean,
    default: true
  },
  openToEvents: {                     // open to job opportunities
    type: Boolean,
    default: false
  },
  
  lookingFor: {                      // what candidate is looking for
    type: [String],                  // e.g., ['remote','full-time','internship']
    default: []
  },
  candidateType: {                   // fresher/intermediate/experienced/etc.
    type: String,
    enum: ['fresher','intermediate','experienced','manager','senior','other'],
    default: 'fresher'
  },
  totalExperienceInMonths: Number,   // calculated/optional
  languages: [String],
  willingToRelocate: { type: Boolean, default: false },
  publicProfile: { type: Boolean, default: true }, // privacy toggle
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}, { _id: false });

const CompanyProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  industry: String,                 // e.g., 'SaaS', 'Fintech'
  foundedYear: Number,
  teamSizeRange: {                   // enum or number ranges
    type: String, 
    enum: ['1-10','11-50','51-200','201-500','501-1000','1001-5000','5000+','unknown'],
    default: 'unknown'
  },
  headquarters: AddressSchema,
  website: String,
  careersPage: String,
  contactEmail: String,
  contactPhone: String,
  social: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  perksAndBenefits: [String],
  specialties: [String],             // e.g., ['AI','Healthcare']
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true }, // store hash only
  name: { type: String, required: true, index: true },
  phone: String,
  role: { type: String, enum: ['candidate','company','admin'], required: true, index: true },

  // common fields
  avatarUrl: String,
  headline: String,                 // lightweight visible headline
  location: AddressSchema,
  timezone: String,
  // role-specific embedded objects:
  candidateProfile: { type: CandidateProfileSchema, default: null },
  companyProfile: { type: CompanyProfileSchema, default: null },

  // social / auth
  oauthProviders: [{ provider: String, providerId: String }],

  // caching & counters for performance
  followerCount: { type: Number, default: 0, index: true },
  followingCount: { type: Number, default: 0 },
  connectionCount: { type: Number, default: 0 },

  // small bounded arrays for UI (last N recent followers / hires)
  recentFollowers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // $push ... $slice used
  recentConnections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // preferences
  notificationPrefs: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true }
  },

  // activity & admin
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

// Indexes: text index for searching candidate/company profiles
UserSchema.index({ name: 'text', 'candidateProfile.headline': 'text', 'candidateProfile.summary': 'text', 'companyProfile.name': 'text', 'companyProfile.description': 'text' }, { weights: { name: 5 } });

export default  mongoose.model('User', UserSchema);
