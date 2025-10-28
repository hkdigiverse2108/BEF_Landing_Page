export const ROUTES = {
  HOME: "/",
  WORKSHOP: {
    WORKSHOP: "/workshop",
    REGISTER: "/workshop/register",
    PAYMENT : "/workshop/payment"
  },
  COURSE: {
    COURSE: "/course",
    DETAILS: "/course/details/:id",
    REGISTER: "/course/register",
    PAYMENT : "/course/payment"
  },
  HELP_SUPPORT: {
    BASE: "/help-support/:slug",
    ABOUT_US: "/help-support/aboutUs",
    ILLEGALITY: "/help-support/illegality",
    TERM_CONDITION: "/help-support/termsCondition",
    PRIVACY_POLICY: "/help-support/privacyPolicy",
    REFUND_POLICY: "/help-support/refundPolicy",
  },
  BLOG : "/blog"


};
