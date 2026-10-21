export const ROUTES = {
  HOME: "/",
  WORKSHOP: {
    WORKSHOP: "/workshop",
    DETAILS :"/workshop/details/:id",
    REGISTER: "/workshop/register",
    PAYMENT: "/workshop/payment",
  },
  COURSE: {
    COURSE: "/course",
    DETAILS: "/course/details/:id",
    REGISTER: "/course/register",
    PAYMENT: "/course/payment",
  },
  STUDENT:{
    ACCOUNT_DELETE:"/student/account-delete"
  },
  HELP_SUPPORT: {
    BASE: "/help-support/:slug",
    ABOUT_US: "/help-support/aboutUs",
    LEGALITY: "/help-support/legality",
    TERM_CONDITION: "/help-support/termsCondition",
    PRIVACY_POLICY: "/help-support/privacyPolicy",
    REFUND_POLICY: "/help-support/refundPolicy",
  },
  BLOG: {
    BLOG: "/blog",
    CATEGORY: "/blog/:categorySlug",
    DETAILS_WITH_CATEGORY: "/blog/:categorySlug/:id",
    DETAILS: "/blog/details/:id",
    SLUG: "/blog/:id",
  },
  MOCK_TEST: {
    INTRO: "/free-upsc-mock-test",
    INSTRUCTION: "/upsc-mock-test-instruction",
    TEST: "/upsc-pyq-practice",
    ANALYSIS: "/upsc-mock-test-analysis",
  },
  PAYMENT: {
    STATUS: "/payment/status",
    SUCCESS: "/payment/success",
    FAILED: "/payment/failed",
  },
  FREE_PRACTICE: "/free-upsc-mock-test",
  PYQ: "/pyq",
  UPSC_PRELIMS_PYQ: "/upsc-prelims-pyq",
};
