import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Using a sample background image URI instead of local file
const backgroundImage = require('../_components/assests/OTP.jpg');

export default function OTP() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(120);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    
    const toastAnimation = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;
    
    // Refs for OTP inputs
    const inputRefs = useRef([]);

    // Button animation
    useEffect(() => {
        Animated.spring(buttonScale, {
            toValue: isButtonHovered ? 1.05 : 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    }, [isButtonHovered]);

    // Show toast message
    const showToast = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        
        Animated.sequence([
            Animated.timing(toastAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(3000),
            Animated.timing(toastAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setToastMessage('');
        });
    };

    // Start countdown timer
    useEffect(() => {
        if (timer > 0 && isResendDisabled) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setIsResendDisabled(false);
        }
    }, [timer, isResendDisabled]);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Auto focus to next input
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
        
        // Auto focus to previous input on backspace
        if (value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 4) {
            if (enteredOtp === '1234') {
                showToast('OTP verified successfully!', 'success');
            } else {
                showToast('The OTP you entered is incorrect. Please try again.', 'error');
                setOtp(['', '', '', '']);
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            }
        } else {
            showToast('Please enter a valid 4-digit OTP', 'error');
        }
    };

    const handleResendOtp = () => {
        setOtp(['', '', '', '']);
        setTimer(120);
        setIsResendDisabled(true);
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
        showToast('A new OTP has been sent to your email.', 'success');
    };

    const toastTranslateY = toastAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
    });

    const toastBackgroundColor = toastType === 'success' ? '#4CAF50' : '#F44336';

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* Toast Message */}
            {toastMessage ? (
                <Animated.View 
                    style={[
                        styles.toastContainer, 
                        { 
                            transform: [{ translateY: toastTranslateY }],
                            backgroundColor: toastBackgroundColor 
                        }
                    ]}
                >
                    <Text style={styles.toastText}>{toastMessage}</Text>
                </Animated.View>
            ) : null}
            
            <ImageBackground 
                source={backgroundImage}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
                
                {/* Header at the top */}
                <View style={styles.header}>
                    <Text style={styles.title}>Travel & Tourism</Text>
                    <Text style={styles.subtitle}>Explore the world with us</Text>
                </View>
                
                {/* Verification box at the bottom */}
                <View style={styles.bottomContainer}>
                    <View style={styles.verificationBox}>
                        <Text style={styles.verificationTitle}>Verify Your Email</Text>
                        
                        <Text style={styles.instructions}>
                            Enter the 4-digit code we sent to
                        </Text>
                        <Text style={styles.instructions}>
                            your Email Address:
                        </Text>
                        <Text style={styles.email}>user@example.com</Text>

                        {/* OTP Input Fields */}
                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.otpInput}
                                    value={digit}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    selectTextOnFocus
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                />
                            ))}
                        </View>

                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={handleSubmit}
                                onPressIn={() => setIsButtonHovered(true)}
                                onPressOut={() => setIsButtonHovered(false)}
                            >
                                <Text style={styles.buttonText}>Verify</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>Didn't get code? </Text>
                            {isResendDisabled ? (
                                <Text style={styles.disabledResend}>
                                    Resend OTP
                                </Text>
                            ) : (
                                <TouchableOpacity onPress={handleResendOtp}>
                                    <Text style={styles.resendLink}>Resend OTP</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        
                        <Text style={styles.footer}>
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    // Toast styles
    toastContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 15,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toastText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        position: 'absolute',
        top: 50,
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        letterSpacing: 1.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontStyle: 'italic',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    verificationBox: {
        width: '100%',
        backgroundColor: 'rgba(255, 159, 10, 0.85)', // Opacity decreased from 0.95 to 0.7
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    verificationTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 15,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    instructions: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    email: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 25,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FF8C00',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    resendText: {
        color: '#FFFFFF',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    resendLink: {
        color: '#8C363F',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    disabledResend: {
        color: '#AAAAAA',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        lineHeight: 18,
    },
});