// User Types
export enum UserType {
  ADMIN = 'admin',
  DONOR = 'donor',
  BENEFICIARY = 'beneficiary',
}

// Staff Roles
export enum StaffRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  PROGRAM_MANAGER = 'program_manager',
  DATA_ENTRY = 'data_entry',
  VIEWER = 'viewer',
}

// Languages
export enum Language {
  EN = 'en',
  RW = 'rw',
}

// Beneficiary Status
export enum BeneficiaryStatus {
  ACTIVE = 'active',
  GRADUATED = 'graduated',
  INACTIVE = 'inactive',
}

// Tracking Frequency
export enum TrackingFrequency {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

// Attendance Status
export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

// Task Status
export enum TaskStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  NOT_DONE = 'not_done',
}

// Goal Types
export enum GoalType {
  FINANCIAL = 'financial',
  BUSINESS = 'business',
  EDUCATION = 'education',
  PERSONAL = 'personal',
  SKILLS = 'skills',
}

// Goal Status
export enum GoalStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ACHIEVED = 'achieved',
  ABANDONED = 'abandoned',
}

// Program Categories
export enum ProgramCategory {
  EDUCATION = 'education',
  ENTREPRENEURSHIP = 'entrepreneurship',
  HEALTH = 'health',
  CROSS_CUTTING = 'cross_cutting',
}

// Program Status
export enum ProgramStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

// Payment Methods
export enum PaymentMethod {
  CARD = 'card',
  MOBILE_MONEY = 'mobile_money',
  BANK_TRANSFER = 'bank_transfer',
  PAYPAL = 'paypal',
}

// Payment Status
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

// Donation Types
export enum DonationType {
  ONE_TIME = 'one_time',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

// Recurring Frequency
export enum RecurringFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

// Recurring Status
export enum RecurringStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
}

// Currencies
export enum Currency {
  RWF = 'RWF',
  USD = 'USD',
  EUR = 'EUR',
}

// Receipt Preferences
export enum ReceiptPreference {
  EMAIL = 'email',
  POSTAL = 'postal',
  NONE = 'none',
}

// Document Types
export enum DocumentType {
  ID_CARD = 'id_card',
  BIRTH_CERTIFICATE = 'birth_certificate',
  SCHOOL_CERTIFICATE = 'school_certificate',
  MEDICAL_REPORT = 'medical_report',
  BUSINESS_LICENSE = 'business_license',
  OTHER = 'other',
}

// Notification Types
export enum NotificationType {
  DONATION_RECEIPT = 'donation_receipt',
  TRACKING_REMINDER = 'tracking_reminder',
  PROGRAM_UPDATE = 'program_update',
  IMPACT_REPORT = 'impact_report',
  SYSTEM_ALERT = 'system_alert',
  WELCOME = 'welcome',
  PASSWORD_RESET = 'password_reset',
}

// Notification Status
export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  READ = 'read',
}

// Notification Channel
export enum NotificationChannel {
  SMS = 'sms',
  EMAIL = 'email',
  IN_APP = 'in_app',
}

// Metric Period
export enum MetricPeriod {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
}

// Metric Source
export enum MetricSource {
  KOBO = 'kobo',
  MANUAL = 'manual',
  SYSTEM_CALCULATED = 'system_calculated',
}

// Author Roles
export enum AuthorRole {
  BENEFICIARY = 'beneficiary',
  DONOR = 'donor',
  STAFF = 'staff',
  PARTNER = 'partner',
  VOLUNTEER = 'volunteer',
}

// 1. USER ENTITY
export interface User {
  id: string;
  email: string | null;
  fullName: string;
  phone: string;
  userType: UserType; // ADMIN, DONOR, BENEFICIARY
  language: Language; // EN, RW
  isVerified: boolean;
  verificationToken: string | null;
  verifiedAt: Date | null;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
  offlineSyncToken: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
}

// 2. STAFF ENTITY
export interface Staff {
  id: string;
  user: User;
  fullName: string;
  role: StaffRole; // SUPER_ADMIN, ADMIN, etc.
  department: string | null;
  permissions: string[];
  employeeId: string | null;
  hireDate: Date | null;
  contactInfo: {
    emergencyContact: string;
    emergencyPhone: string;
    address: string;
  } | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  submittedTrackings: WeeklyTracking[];
  verifiedTrackings: WeeklyTracking[];
  uploadedDocuments: BeneficiaryDocument[];
  verifiedDocuments: BeneficiaryDocument[];
  verifiedMetrics: ImpactMetric[];
}

// 3. ACTIVITY LOG ENTITY
export interface ActivityLog {
  id: string;
  user: User | null;
  action: string;
  entityType: string;
  entityId: string;
  oldValues: Record<string, any> | null;
  newValues: Record<string, any> | null;
  changes: Record<string, { old: any; new: any }> | null;
  ipAddress: string;
  userAgent: string | null;
  description: string | null;
  location: {
    country: string;
    region: string;
    city: string;
  } | null;
  createdAt: Date;
}

// 4. BENEFICIARY ENTITY
export interface Beneficiary {
  id: string;
  user: User;
  fullName: string;
  dateOfBirth: Date;
  location: {
    district: string;
    sector: string;
    cell: string;
    village: string;
  };
  program: Program;
  status: BeneficiaryStatus; // ACTIVE, GRADUATED, INACTIVE
  enrollmentDate: Date;
  exitDate: Date | null;
  startCapital: number;
  currentCapital: number;
  businessType: string;
  trackingFrequency: TrackingFrequency; // WEEKLY, MONTHLY
  lastTrackingDate: Date | null;
  nextTrackingDate: Date | null;
  profileCompletion: number;
  requiresSpecialAttention: boolean;
  createdAt: Date;
  updatedAt: Date;
  weeklyTrackings: WeeklyTracking[];
  goals: Goal[];
  documents: BeneficiaryDocument[];
  emergencyContacts: EmergencyContact[];
}

// 5. DONOR ENTITY
export interface Donor {
  id: string;
  user: User;
  fullName: string;
  country: string;
  preferredCurrency: Currency; // RWF, USD, EUR
  communicationPreferences: {
    email: boolean;
    sms: boolean;
  };
  receiptPreference: ReceiptPreference; // EMAIL, POSTAL, NONE
  totalDonated: number;
  lastDonationDate: Date | null;
  isRecurringDonor: boolean;
  anonymityPreference: boolean;
  receiveNewsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
  donations: Donation[];
  recurringDonations: RecurringDonation[];
}

// 6. NOTIFICATION ENTITY
export interface Notif {
  id: string;
  user: User;
  type: NotificationType; // DONATION_RECEIPT, TRACKING_REMINDER, etc.
  title: {
    en: string;
    rw: string;
  };
  message: {
    en: string;
    rw: string;
  };
  data: Record<string, any> | null;
  status: NotificationStatus; // PENDING, SENT, etc.
  channel: NotificationChannel; // SMS, EMAIL, IN_APP
  scheduledFor: Date | null;
  sentAt: Date | null;
  deliveredAt: Date | null;
  readAt: Date | null;
  deliveryReport: {
    providerId: string;
    status: string;
    errorMessage: string;
    cost: number;
  } | null;
  createdAt: Date;
}

// 7. GOAL ENTITY
export interface Goal {
  id: string;
  beneficiary: Beneficiary;
  description: string;
  type: GoalType; // FINANCIAL, BUSINESS, etc.
  targetAmount: number;
  currentProgress: number;
  targetDate: Date;
  status: GoalStatus; // NOT_STARTED, IN_PROGRESS, etc.
  milestones: Array<{
    description: string;
    targetAmount: number;
    targetDate: Date;
    completed: boolean;
    completedAt: Date;
  }> | null;
  notes: string | null;
  actionPlan: {
    steps: string[];
    resourcesNeeded: string[];
    timeline: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

// 8. EMERGENCY CONTACT ENTITY
export interface EmergencyContact {
  id: string;
  beneficiary: Beneficiary;
  name: string;
  relationship: string;
  phone: string;
  alternatePhone: string | null;
  address: string;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 9. WEEKLY TRACKING ENTITY
export interface WeeklyTracking {
  id: string;
  beneficiary: Beneficiary;
  weekEnding: Date;
  attendance: AttendanceStatus; // PRESENT, ABSENT, LATE
  taskGiven: string | null;
  taskCompletionStatus: TaskStatus | null; // COMPLETED, IN_PROGRESS, NOT_DONE
  incomeThisWeek: number;
  expensesThisWeek: number;
  currentCapital: number;
  salesData: {
    unitsSold: number;
    averagePrice: number;
    bestSellingProduct: string;
  } | null;
  challenges: string | null;
  solutionsImplemented: string | null;
  notes: string | null;
  nextWeekPlan: {
    tasks: string[];
    goals: string[];
    supportNeeded: string[];
  } | null;
  submittedBy: User | null;
  submittedByType: UserType;
  isOfflineSync: boolean;
  syncSessionId: string | null;
  offlineData: {
    deviceInfo: string;
    location: {
      latitude: number;
      longitude: number;
    };
    timestamp: Date;
  } | null;
  submittedAt: Date;
  verifiedAt: Date | null;
  verifiedBy: Staff | null;
}

// 10. BENEFICIARY DOCUMENT ENTITY
export interface BeneficiaryDocument {
  id: string;
  beneficiary: Beneficiary;
  documentType: DocumentType; // ID_CARD, BIRTH_CERTIFICATE, etc.
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  publicId: string;
  uploadedBy: User | null;
  uploadedByType: UserType;
  verified: boolean;
  verifiedBy: Staff | null;
  verifiedAt: Date | null;
  createdAt: Date;
}

// 11. DONATION ENTITY
export interface Donation {
  id: string;
  donor: Donor;
  amount: number;
  currency: string;
  localAmount: number;
  exchangeRate: number;
  donationType: DonationType; // ONE_TIME, MONTHLY, etc.
  project: Project | null;
  program: Program | null;
  paymentMethod: PaymentMethod; // CARD, MOBILE_MONEY, etc.
  paymentStatus: PaymentStatus; // PENDING, COMPLETED, etc.
  transactionId: string;
  paymentDetails: {
    provider: string;
    accountNumber?: string;
    mobileNumber?: string;
    network?: string;
    cardLast4?: string;
    cardBrand?: string;
  } | null;
  receiptSent: boolean;
  receiptSentAt: Date | null;
  receiptNumber: string | null;
  isAnonymous: boolean;
  metadata: {
    ipAddress: string;
    userAgent: string;
    paymentGatewayResponse: any;
    taxReceiptEligible: boolean;
  } | null;
  donorMessage: string | null;
  isTest: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 12. RECURRING DONATION ENTITY
export interface RecurringDonation {
  id: string;
  donor: Donor;
  amount: number;
  currency: string;
  frequency: RecurringFrequency; // MONTHLY, QUARTERLY, YEARLY
  project: Project | null;
  program: Program | null;
  status: RecurringStatus; // ACTIVE, PAUSED, CANCELLED
  nextChargeDate: Date;
  lastChargedDate: Date | null;
  lastChargeId: string | null;
  paymentMethodId: string;
  subscriptionId: string;
  paymentMethodDetails: {
    type: string;
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
  totalCharges: number;
  totalAmount: number;
  startDate: Date | null;
  endDate: Date | null;
  cancellationReason: string | null;
  sendReminders: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 13. PROGRAM ENTITY
export interface Program {
  id: string;
  name: {
    en: string;
    rw: string;
  };
  description: {
    en: string;
    rw: string;
  };
  category: ProgramCategory; // EDUCATION, ENTREPRENEURSHIP, etc.
  sdgAlignment: number[];
  kpiTargets: Record<string, any>;
  startDate: Date;
  endDate: Date | null;
  status: ProgramStatus; // PLANNING, ACTIVE, etc.
  budget: number;
  fundsAllocated: number;
  fundsUtilized: number;
  coverImage: string | null;
  logo: string | null;
  sortOrder: number;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  projects: Project[];
  beneficiaries: Beneficiary[];
  impactMetrics: ImpactMetric[];
  stories: Story[];
  donations: Donation[];
}

// 14. PROJECT ENTITY
export interface Project {
  id: string;
  program: Program;
  name: {
    en: string;
    rw: string;
  };
  description: {
    en: string;
    rw: string;
  };
  budgetRequired: number;
  budgetReceived: number;
  budgetUtilized: number;
  timeline: {
    start: Date;
    end: Date;
    milestones: any[];
  };
  location: {
    districts: string[];
    sectors: string[];
  };
  impactMetrics: {
    beneficiariesTarget: number;
    beneficiariesReached: number;
    successIndicators: any[];
  };
  donationAllocationPercentage: number;
  isActive: boolean;
  isFeatured: boolean;
  coverImage: string | null;
  gallery: Array<{
    url: string;
    caption: string;
    type: string;
  }> | null;
  createdAt: Date;
  updatedAt: Date;
  donations: Donation[];
}

// 15. IMPACT METRIC ENTITY
export interface ImpactMetric {
  id: string;
  program: Program;
  metricName: string;
  metricValue: number;
  measurementUnit: string;
  period: MetricPeriod; // WEEKLY, MONTHLY, etc.
  periodDate: Date;
  source: MetricSource; // KOBO, MANUAL, etc.
  notes: string | null;
  verifiedBy: Staff | null;
  verifiedAt: Date | null;
  createdAt: Date;
}

// 16. STORY ENTITY
export interface Story {
  id: string;
  title: {
    en: string;
    rw: string;
  };
  content: {
    en: string;
    rw: string;
  };
  authorName: string;
  authorRole: AuthorRole; // BENEFICIARY, DONOR, etc.
  authorPhoto: string | null;
  program: Program | null;
  beneficiaryId: string | null;
  media: Array<{
    url: string;
    type: 'image' | 'video';
    caption: string;
    thumbnail: string;
  }> | null;
  isFeatured: boolean;
  isPublished: boolean;
  publishedDate: Date;
  language: Language; // EN, RW
  viewCount: number;
  shareCount: number;
  metadata: {
    tags: string[];
    location: string;
    duration: number;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalBeneficiaries: number;
  activeBeneficiaries: number;
  totalDonors: number;
  totalDonations: number;
  activePrograms: number;
  graduatedBeneficiaries: number;
  recentDonations: Donation[];
  monthlyTrends: {
    month: string;
    beneficiaries: number;
    donations: number;
  }[];
}
