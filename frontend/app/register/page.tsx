"use client";
import { useState } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import { ChevronLeft, ChevronRight, Copy, CopyCheck, CopyIcon, SendHorizonal } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import Image from "next/image";

export default function RegisterMultiStep() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [passwordTouched, setPasswordTouched] = useState(false);

  const initialFormState = {
    // Step 1 - Personal Details
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    languages: { English: false, Tamil: false, Sinhala: false },
    nicNumber: "",
    emergencyContact: "",

    // Step 2 - Business Details
    businessName: "",
    businessOverview:"",
    businessType: "Individual", // default
    businessRegNumber: "",
    officeAddress: "",
    officeContact: "",
    operatingCity: "",

    // Step 3 - Documentations (files)
    nicPicture: null,
    brDocument: null,
    proofOfAddress: null,
    rentalAgreement: null,
    businessProfilePicture: null,

    // Step 4 - Payment Proof
    paymentProof: null,
  };
  const [formData, setFormData] = useState(initialFormState);
  

  // Helper for input changes (text, radio, checkbox)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked, files } = e.target;

    if (type === "checkbox" && name === "languages") {
      // Multi-checkbox for languages
      setFormData((prev) => ({
        ...prev,
        languages: { ...prev.languages, [value]: checked },
      }));
    } else if (type === "file") {
      // File upload
      setFormData((prev) => ({
        ...prev,
        [name]: files && files.length > 0 ? files[0] : null,
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // copy to clipboard function
  const copyToClipboard = (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    // Modern method
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback method for older mobile browsers
    let textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // prevent scroll
    textArea.style.left = "-9999px";    // hide from view
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
    return Promise.resolve();
  }
};

  // Step validation example for moving next
  const isStepValid = () => {
    if (step === 1) {
      return (
        formData.fullName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.password !== "" &&
        formData.password === formData.confirmPassword &&
        (formData.languages.English ||
          formData.languages.Tamil ||
          formData.languages.Sinhala) &&
        formData.nicNumber.trim() !== "" &&
        formData.emergencyContact.trim() !== ""
      );
    }
    if (step === 2) {
      return (
        formData.businessName.trim() !== "" &&
        (formData.businessType === "Individual" ||
          formData.businessType === "Registered Company") &&
        formData.officeAddress.trim() !== "" &&
        formData.officeContact.trim() !== "" &&
        formData.operatingCity.trim() !== ""
      );
    }
    if (step === 3) {
      return (
        formData.nicPicture !== null &&
        formData.proofOfAddress !== null &&
        formData.rentalAgreement !== null &&
        formData.businessProfilePicture !== null
      );
    }
    if (step === 4){
      return(
        formData.paymentProof !== null
      );
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      setStep(step + 1);
    } else {
      alert("Please fill in all required fields correctly to proceed.");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      setLoading(true); // show loading

      const formDataToSend = new FormData();

      // Step 1 - Personal Details
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("nicNumber", formData.nicNumber);
      formDataToSend.append("emergencyContact", formData.emergencyContact);

      // Languages (convert object -> JSON string)
      formDataToSend.append("languages", JSON.stringify(formData.languages));

      // Step 2 - Business Details
      formDataToSend.append("businessName", formData.businessName);
      formDataToSend.append("businessType", formData.businessType);
      formDataToSend.append("businessRegNumber", formData.businessRegNumber);
      formDataToSend.append("officeAddress", formData.officeAddress);
      formDataToSend.append("officeContact", formData.officeContact);
      formDataToSend.append("operatingCity", formData.operatingCity);

      // Step 3 - Files
      if (formData.nicPicture)
        formDataToSend.append("nicPicture", formData.nicPicture);
      if (formData.brDocument)
        formDataToSend.append("brDocument", formData.brDocument);
      if (formData.proofOfAddress)
        formDataToSend.append("proofOfAddress", formData.proofOfAddress);
      if (formData.rentalAgreement)
        formDataToSend.append("rentalAgreement", formData.rentalAgreement);
      if (formData.businessProfilePicture)
        formDataToSend.append(
          "businessProfilePicture",
          formData.businessProfilePicture
        );

      if (formData.businessOverview)
        formDataToSend.append(
        "businessOverview",
        formData.businessOverview
      );

      // Step 4 - Payment
      if (formData.paymentProof)
        formDataToSend.append("paymentProof",formData.paymentProof);

      // 🔑 API call
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor`, {
        method: "POST",
        headers: {
          "User-Agent": navigator.userAgent,
        },
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        setShowSuccessModal(true);
        // alert("Registration successful!");
        console.log(data);

        // ✅ reset form
        setFormData(initialFormState);
        setStep(1); // go back to step 1
      } else {
        // alert(data.message || "Registration failed");
        setError(data.message || "Registration failed");
      }
    } catch (err: any) {
      console.error(err.message);
      setError(err.message || "Registration failed");
      // alert("Something went wrong while submitting the form");
    } finally {
      setLoading(false); // hide loading
    }
  };

  const isPasswordValid = passwordRegex.test(formData.password);

  return (
    <Layout footerStyle={1}>
      <div className="container pt-5 pb-5" style={{ maxWidth: 700 }}>
        <h3 className="mb-4 text-center">Account Registration</h3>
        <div className="border rounded-5 shadow my-5 p-5">
          <Form onSubmit={handleSubmit}>
            {/* Step Indicators */}
            <div className="mb-4 d-flex justify-content-between flex-wrap gap-2">
              {[
                { number: 1, label: "Personal Details" },
                { number: 2, label: "Business Details" },
                { number: 3, label: "Document Uploads" },
                { number: 4, label: "Payment" },
              ].map((stepItem) => (
                <div
                  key={stepItem.number}
                  className={`step-indicator d-flex flex-column align-items-center justify-content-center text-center p-2 flex-grow-1 ${
                    step === stepItem.number
                      ? "bg-primary text-black shadow"
                      : "bg-light text-muted"
                  }`}
                  style={{
                    minWidth: 80,   // ensures it doesn't get too small on mobile
                    maxWidth: 150,  // prevents extra large size on desktop
                    borderRadius: 12,
                    cursor: "pointer",
                  }}
                  onClick={() => setStep(stepItem.number)}
                >
                  <strong className="fs-6">{stepItem.number}</strong>
                  <small className="text-truncate d-block" style={{ fontSize: "0.7rem" }}>
                    {stepItem.label}
                  </small>
                </div>
              ))}
            </div>


            {/* Step 1 - Personal Details */}
            {step === 1 && (
              <>
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>
                    <strong>Full name *</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>
                    <strong>Email Address *</strong>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>
                    <strong>Phone Number *</strong>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={
                      formData.phone !== "" &&
                      !/^(?:\+94|0)7\d{8}$/.test(formData.phone)
                    }
                    required
                  />
                  <div className="mt-2 small">
                    <div
                      className={
                        /^(?:\+94|0)7\d{8}$/.test(formData.phone)
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {/^(?:\+94|0)7\d{8}$/.test(formData.phone) ? "✅" : "❌"}{" "}
                      Valid Sri Lankan mobile number
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>
                    <strong>Password *</strong>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => setPasswordTouched(true)}
                    isInvalid={passwordTouched && !isPasswordValid}
                    required
                  />

                  {/* ✅ Live password rules checklist */}
                  <div className="mt-2 small">
                    <div
                      className={
                        /[A-Z]/.test(formData.password)
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {/[A-Z]/.test(formData.password) ? "✅" : "❌"} At least
                      one uppercase letter
                    </div>
                    <div
                      className={
                        /[a-z]/.test(formData.password)
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {/[a-z]/.test(formData.password) ? "✅" : "❌"} At least
                      one lowercase letter
                    </div>
                    <div
                      className={
                        /\d/.test(formData.password)
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {/\d/.test(formData.password) ? "✅" : "❌"} At least one
                      number
                    </div>
                    <div
                      className={
                        /[@$!%*?&]/.test(formData.password)
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {/[@$!%*?&]/.test(formData.password) ? "✅" : "❌"} At
                      least one special character
                    </div>
                    <div
                      className={
                        formData.password.length >= 8
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {formData.password.length >= 8 ? "✅" : "❌"} Minimum 8
                      characters
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>
                    <strong>Confirm Password *</strong>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    isInvalid={formData.password !== formData.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Language *</strong>
                  </Form.Label>
                  <div>
                    {(["English", "Tamil", "Sinhala"] as const).map(
                      (lang, index) => (
                        <Form.Check
                          inline
                          className="pr-5"
                          key={index}
                          label={lang}
                          type="checkbox"
                          name="languages"
                          value={lang}
                          checked={
                            formData.languages[
                              lang as keyof typeof formData.languages
                            ]
                          }
                          onChange={handleChange}
                        />
                      )
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="nicNumber">
                  <Form.Label>
                    <strong>NIC number *</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nicNumber"
                    value={formData.nicNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="emergencyContact">
                  <Form.Label>
                    <strong>Emergency Contact *</strong>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    required
                    isInvalid={
                      formData.emergencyContact !== "" &&
                      !/^(?:\+94|0)7\d{8}$/.test(formData.emergencyContact)
                    }
                  />
                  <div className="mt-2 small">
                    <div
                      className={
                        /^(?:\+94|0)7\d{8}$/.test(formData.emergencyContact)
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {/^(?:\+94|0)7\d{8}$/.test(formData.emergencyContact)
                        ? "✅"
                        : "❌"}{" "}
                      Valid Sri Lankan mobile number
                    </div>
                  </div>
                </Form.Group>
              </>
            )}

            {/* Step 2 - Business Details */}
            {step === 2 && (
              <>
                <Form.Group className="mb-3" controlId="businessName">
                  <Form.Label>
                    <strong>Business Name *</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="businessOverview">
                  <Form.Label>
                    <strong>Business Overview </strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="businessOverview"
                    value={formData.businessOverview}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Business Type *</strong>
                  </Form.Label>
                  {["Individual", "Registered Company"].map((type) => (
                    <Form.Check
                      className="mb-2" // Add spacing between radios
                      key={type}
                      label={type}
                      type="radio"
                      name="businessType"
                      value={type}
                      checked={formData.businessType === type}
                      onChange={handleChange}
                      required
                    />
                  ))}
                </Form.Group>

                <Form.Group className="mb-3" controlId="businessRegNumber">
                  <Form.Label>
                    <strong>Business Registration Number (optional)</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="businessRegNumber"
                    value={formData.businessRegNumber}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="officeAddress">
                  <Form.Label>
                    <strong>Office Address *</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="officeContact">
                  <Form.Label>
                    <strong>Office Contact Number *</strong>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="officeContact"
                    value={formData.officeContact}
                    onChange={handleChange}
                    required
                    isInvalid={
                      formData.officeContact !== "" &&
                      !/^(?:\+94|0)7\d{8}$/.test(formData.officeContact)
                    }
                  />
                  <div className="mt-2 small">
                    <div
                      className={
                        /^(?:\+94|0)7\d{8}$/.test(formData.officeContact)
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {/^(?:\+94|0)7\d{8}$/.test(formData.officeContact)
                        ? "✅"
                        : "❌"}{" "}
                      Valid Sri Lankan mobile number
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="operatingCity">
                  <Form.Label>
                    <strong>Operating City *</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="operatingCity"
                    value={formData.operatingCity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            {/* Step 3 - Documents Upload */}
            {step === 3 && (
              <>
                <Form.Group className="mb-3" controlId="nicPicture">
                  <Form.Label>
                    <strong>NIC Picture *</strong>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="nicPicture"
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brDocument">
                  <Form.Label>
                    <strong>Business Registration (optional)</strong>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="brDocument"
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="proofOfAddress">
                  <Form.Label>
                    <strong>Proof of Address *</strong>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="proofOfAddress"
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rentalAgreement">
                  <Form.Label>
                    <strong>Rental Agreement PDF *</strong>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="rentalAgreement"
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="businessProfilePicture">
                  <Form.Label>
                    <strong>Business Profile Picture *</strong>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="businessProfilePicture"
                    accept="image/*"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}
            {/* Step 4 - Payment Upload */}
            {step === 4 && (
              <>
                <div className="col-lg-12 col-sm-6">
									<div className="card-contact">
										<div className="card-image">
											<div className="card-icon background-card border rounded-2 border-dark">
												<Image
                        src={"/assets/imgs/banks/hnb.png"}
                        height={45}
                        width={50}
                        alt="hnb logo"
                        />
											</div>
										</div>
										<div className="card-info">
											<div className="card-title">
												<Link className="title text-lg-bold" href="#">Hatton National Bank</Link>
												<p className="text-md-medium neutral-500"><strong>Account Holder Name : </strong>Aadhil Shihabdeen</p>
												<p className="text-md-medium neutral-500"><strong>Account Number :</strong> 078020095299</p>
												<p className="text-md-medium neutral-500"><strong>Branch :</strong> Akkaraipattu</p>
											</div>
											<div>
                        <button
                          type="button"
                          className="btn btn-link email text-md-bold p-0"
                          onClick={() => {
                            const bankDetails = `078020095299`;

                            copyToClipboard(bankDetails).then(() => {
                              alert("Account number copied to clipboard!");
                            });
                          }}
                        >
                          Copy account number<Copy size={15} className="ml-2" />
                        </button>
                      </div>
										</div>
									</div>
								</div>
                <div className="col-lg-12 col-sm-6">
                  <div className="card-contact">
                    <div className="card-image">
                      <div className="card-icon background-card border rounded-2 border-dark">
                        <Image
                          src={"/assets/imgs/banks/combank.png"}
                          height={45}
                          width={50}
                          alt="combank logo"
                        />
                      </div>
                    </div>
                    <div className="card-info">
                      <div className="card-title">
                        <Link className="title text-lg-bold" href="#">
                          Commercial Bank
                        </Link>
                        <p className="text-md-medium neutral-500">
                          <strong>Account Holder Name : </strong>J.A. Aathil
                        </p>
                        <p className="text-md-medium neutral-500">
                          <strong>Account Number :</strong> 8172009760
                        </p>
                        <p className="text-md-medium neutral-500">
                          <strong>Branch :</strong> Akkaraipattu
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-link email text-md-bold p-0"
                          onClick={() => {
                            const bankDetails = `8172009760`;

                            copyToClipboard(bankDetails).then(() => {
                              alert("Account number copied to clipboard!");
                            });
                          }}
                        >
                          Copy account number <Copy size={15} className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


                <Form.Group className="mb-3" controlId="paymentProof">
                  <Form.Label>
                    <strong>Payment Proof*</strong>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="paymentProof"
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}
            {error && <div className="alert alert-danger">* {error}</div>}

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
              {step > 1 && (
                <Button
                  className="btn btn-secondary rounded-3.5"
                  onClick={handleBack}
                >
                  <ChevronLeft size={18} />
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  className="ms-auto"
                >
                  Next
                  <ChevronRight size={18} className="ms-2" />
                </Button>
              ) : (
                <>
                  <Button
                    className="btn btn-secondary rounded-3.5"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <SendHorizonal size={17} className="ms-2" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>
      </div>
      {showSuccessModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header">
                <h5 className="modal-title">Registration Submitted</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSuccessModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Thank you for submitting your registration form.
                  <br />
                  <br />
                  Our team is currently reviewing the details provided to ensure
                  all information is accurate and complete. Once the
                  verification process is finalized, we will reach out to you
                  with the next steps.
                  <br />
                  <br />
                  We appreciate your patience and look forward to connecting
                  with you soon.
                </p>
              </div>
              <div className="modal-footer">
                <Button
                  className="btn btn-primary"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
