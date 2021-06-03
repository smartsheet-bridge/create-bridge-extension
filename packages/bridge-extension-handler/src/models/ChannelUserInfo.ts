export interface ChannelUserInfo {
  email: string;
  firstName?: string;
  lastName?: string;
  locale?: string;
  timezone?: string;
  language?: string;
  phoneNumber?: string;
}

export class ChannelUserInfo {
  /**
   * user email address
   */
  email: string;
  /**
   * user first name
   */
  firstName?: string;
  /**
   * user last name
   */
  lastName?: string;
  /**
   * locale code
   */
  locale?: string;
  /**
   * timezone code
   */
  timezone?: string;
  /**
   * language code
   */
  language?: string;
  /**
   * contact phone number
   */
  phoneNumber?: string;

  public static create(props: Partial<ChannelUserInfo> = {}) {
    return new ChannelUserInfo(props);
  }

  public constructor({
    email,
    firstName,
    lastName,
    locale,
    timezone,
    language,
    phoneNumber,
  }: Partial<ChannelUserInfo> = {}) {
    if (email) this.setEmail(email);
    if (firstName) this.setFirstName(firstName);
    if (lastName) this.setLastName(lastName);
    if (locale) this.setLocale(locale);
    if (timezone) this.setTimezone(timezone);
    if (language) this.setLanguage(language);
    if (phoneNumber) this.setPhoneNumber(phoneNumber);
  }
  /**
   * Sets the user email address.
   * @param email email address.
   */
  setEmail(email: string) {
    this.email = email;
  }

  /**
   * Sets the first name of the user.
   * @param firstName user first name.
   */
  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  /**
   * Sets the last name of the user.
   * @param lastName user last name.
   */
  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  /**
   * Sets the local of the user.
   * @param locale locale code.
   */
  setLocale(locale: string) {
    this.locale = locale;
  }

  /**
   * Sets the timezone of the user.
   * @param timezone timezone code.
   */
  setTimezone(timezone: string) {
    this.timezone = timezone;
  }

  /**
   * Sets the language of the user.
   * @param language language code.
   */
  setLanguage(language: string) {
    this.language = language;
  }

  /**
   * Sets the contact number of the user.
   * @param phoneNumber contact phone number.
   */
  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
}
