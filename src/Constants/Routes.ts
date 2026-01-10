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
    DETAILS: "/blog/details/:id",
  },
  PAYMENT: {
    STATUS: "/payment/status",
    SUCCESS: "/payment/success",
    FAILED: "/payment/failed",
  },
};
