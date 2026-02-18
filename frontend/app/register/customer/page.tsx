'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/context/AuthProvider"

export default function CustomerRegister() {
    const { login } = useAuth()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, phone, password })
            })
            
            const data = await res.json()
            
            if (res.ok) {
                login(data)
            } else {
                setError(data.message || "Registration failed")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

	return (
		<>
			<Layout footerStyle={1}>
				<div className="container pt-140 pb-170">
					<div className="row">
						<div className="col-lg-5 mx-auto">
							<div className="border rounded-3 px-md-5 px-3 ptb-50">
								<div className="login-content">
									<div className="text-center">
										<p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">Register</p>
										<h4 className="neutral-1000">Create your account</h4>
									</div>
									<div className="form-login mt-30">
										<form onSubmit={handleSubmit}>
                                            {error && <div className="alert alert-danger">{error}</div>}
                                            
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        placeholder="First Name"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        placeholder="Last Name"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>

											<div className="form-group">
												<input 
                                                    className="form-control" 
                                                    type="email" 
                                                    placeholder="Email Address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
											</div>

                                            <div className="form-group">
												<input 
                                                    className="form-control" 
                                                    type="tel" 
                                                    placeholder="Phone Number"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
											</div>

											<div className="form-group">
												<input 
                                                    className="form-control password" 
                                                    type="password" 
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
											</div>
											
											<div className="form-group mb-30">
												<button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                                    {loading ? "Creating Account..." : "Register"}
													<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</button>
											</div>
											
											<p className="text-sm-medium neutral-500 text-center mt-70">Already have an account? <Link className="neutral-1000" href="/login">Login Here !</Link></p>
                                            <p className="text-sm-medium neutral-500 text-center mt-2">Want to list your car? <Link className="neutral-1000" href="/register">Become a Vendor</Link></p>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Layout>
		</>
	)
}
