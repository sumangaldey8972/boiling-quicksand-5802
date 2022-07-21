import React, { useEffect, useState } from "react";
import style from "./Sign.module.css";
import {
    Stack,
    Box,
    Heading,
    Text,
    Input,
    Button
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const getData = () => {
    const data = JSON.parse(localStorage.getItem("userInfoCreds"));

    if (data) {
        // console.log("data", data);
        return data;
    } else {
        return [];
    }
};

const Signin = () => {

    const navigate = useNavigate();
    const [submit, setSubmit] = useState(getData());
    const [login, setLogin] = useState([]);
    const [isUser, setIsUser] = useState(false);
    const [signInCreds, setSignInCreds] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        id: Date.now(),
    });

    const [loginCreds, setLoginCreds] = useState({
        email: "",
        password: "",
    });

    const HandleSignIn = (e) => {
        let { name, value } = e.target;
        // console.log( type, name, value);

        setSignInCreds({
            ...signInCreds,
            [name]: value,
        });
    };

    const handleSignInSubmit = () => {
        setSubmit([...submit, signInCreds]);
        setSignInCreds("");
        setIsUser(true);
        alert("Sign Up successfull!");
    };

    useEffect(() => {
        localStorage.setItem("userInfoCreds", JSON.stringify(submit));
    }, [submit]);

    const HandleLogin = (e) => {
        let { name, value } = e.target;
        // console.log( name, value);
        setLoginCreds({
            ...loginCreds,
            [name]: value,
        });
    };

    const HandleLogInSubmit = () => {
        console.log("submit", submit);
        console.log("Login", login);
        setLogin([...login, loginCreds]);
        setLoginCreds("");

        for (let i = 0; i < submit.length; i++) {
            if (
                login[0].email === submit[i].email
            ) {
                alert(`Sign in Successfull! Redirected to Home page `);
                navigate("/");
            } else {
                alert(`Invalid incredential`);
            }
        }
    };

    const gotoLogin = () => {
        setIsUser(false);
    };

    const goToSignIn = () => {
        setIsUser(true);
    };

    return (
        <div>
            <div className={style.HeadLogo}>
                <div className={style.backbtn}>
                    <ArrowBackIcon />
                    <Button>
                        <Link to="/">Back to IndianExpress</Link>
                    </Button>
                </div>

                <div>
                    <img
                        src="	https://indianexpress.com/wp-content/themes/indianexpress/images/evolok/indian-express-logo-n.svg"
                        alt="IndianExpress"
                    />
                </div>
            </div>
            <div className={style.LoginCOntainer}>
                <div className={style.LoginForm}>
                    <Heading as="h2" size="md" noOfLines={1}>
                        WELCOME BACK
                    </Heading>
                    <Stack spacing={4}>
                        <Box
                            textAlign="center"
                            bg="#d6d3d32e"
                            w="100%"
                            p={2}
                            border="1px solid #cfcfcf"
                            borderRadius="12px"
                        >
                            <div className={style.IconDiv}>
                                <FcGoogle /> Continue with Google
                            </div>
                        </Box>

                        <Box
                            textAlign="center"
                            bg="#d6d3d32e"
                            w="100%"
                            p={2}
                            border="1px solid #cfcfcf"
                            borderRadius="12px"
                        >
                            <div className={style.IconDiv}>
                                <FaFacebook color="rgb(1, 1, 145)" /> Continue with Facebook
                            </div>
                        </Box>
                        <Box
                            textAlign="center"
                            bg="#d6d3d32e"
                            w="100%"
                            p={2}
                            border="1px solid #cfcfcf"
                            borderRadius="12px"
                        >
                            <div className={style.IconDiv}>
                                <FaApple color="black" />
                                Continue with Apple
                            </div>
                        </Box>
                    </Stack>

                    <div className={style.orDiv}>
                        <div></div>
                        <div>or</div>
                        <div></div>
                    </div>
                </div>

                {!isUser ? (
                    <div className={style.AlreadySiginn}>
                        <Stack>
                            <Text
                                fontSize="md"
                                w="90%"
                                margin="auto"
                                color="rgb(109 109 147)"
                            >
                                Enter the email address or mobile number associated with your
                                account to sign in.
                            </Text>
                        </Stack>
                        <div className={style.InputDiv}>
                            <Input
                                variant="flushed"
                                name="email"
                                value={loginCreds.email}
                                placeholder="Insert your registered Email/Phone"
                                type="email"
                                onChange={HandleLogin}
                            />
                        </div>

                        <div className={style.SubmitButton}>
                            <Button size="lg" w="100%" onClick={HandleLogInSubmit} >
                                Log In
                            </Button>
                        </div>

                        <div className={style.TakingtoSignIn}>
                            <div>
                                <Text color="gray.500">New to Indian Express?</Text>
                            </div>
                            <div onClick={goToSignIn}>
                                <h1>Create an account to get started</h1>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={style.NeedToSiginn}>
                        <div className={style.InputDiv2}>
                            <Input
                                variant="flushed"
                                name="email"
                                value={signInCreds.email}
                                placeholder="Email Address"
                                type="email"
                                onChange={HandleSignIn}
                            />
                            <Input
                                variant="flushed"
                                name="password"
                                value={signInCreds.password}
                                placeholder="Password"
                                type="password"
                                onChange={HandleSignIn}
                            />
                            <Input
                                variant="flushed"
                                name="confirmPassword"
                                value={signInCreds.confirmPassword}
                                placeholder="Confirm Password"
                                type="password"
                                onChange={HandleSignIn}
                            />
                        </div>

                        <div className={style.TC}>
                            <div>
                                <input type="checkbox" />
                                <p>
                                    Yes, I'd like to receive The Indian Express daily newsletter.
                                </p>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <p>Accept Terms and Conditions and our privacy policy</p>
                            </div>
                        </div>

                        <div className={style.SubmitButton}>
                            <Button size="lg" w="100%" onClick={handleSignInSubmit}>
                                Register
                            </Button>
                        </div>

                        <div className={style.TakingtoSignIn}>
                            <div>
                                <Text color="gray.500">Already Have an Account?</Text>
                            </div>
                            <div onClick={gotoLogin}>
                                <h1>Sign in</h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signin;