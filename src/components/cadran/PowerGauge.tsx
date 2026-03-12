import ComicText from '@/components/ui/ComicText';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import Svg, { Circle, Defs, G, Line, RadialGradient, Stop } from 'react-native-svg';

interface PowerGaugeProps {
    progress: number; // 0 to 1
    size?: number;
    showExplosion?: boolean;
}

export default function PowerGauge({
    progress,
    size = 360,   // ← Taille par défaut augmentée
    showExplosion = false,
}: PowerGaugeProps) {

    const animatedAngle = useRef(new Animated.Value(progress)).current;

    const [isExplodingLocal, setIsExplodingLocal] = useState(false);
    const burstScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (progress === 0 && showExplosion) {
            setIsExplodingLocal(true);

            Animated.sequence([
                Animated.timing(burstScale, { toValue: 1.2, duration: 200, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
                Animated.timing(burstScale, { toValue: 1, duration: 150, useNativeDriver: true })
            ]).start();

            const timer = setTimeout(() => {
                Animated.timing(burstScale, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
                    setIsExplodingLocal(false);
                });
            }, 4000);

            return () => clearTimeout(timer);
        } else {
            setIsExplodingLocal(false);
            burstScale.setValue(0);
        }
    }, [progress, showExplosion]);

    useEffect(() => {
        Animated.timing(animatedAngle, {
            toValue: progress,
            duration: 1000,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
        }).start();
    }, [progress]);

    const rotation = animatedAngle.interpolate({
        inputRange: [0, 1],
        outputRange: ['-120deg', '120deg'],
    });

    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isExplodingLocal) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnim, { toValue: 4, duration: 40, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: -4, duration: 40, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
                ])
            ).start();
        } else {
            shakeAnim.setValue(0);
            shakeAnim.stopAnimation();
        }
    }, [isExplodingLocal]);

    const center = size / 2;
    const radius = center - 20;

    return (
        <Animated.View style={[styles.container, { width: size, height: size, transform: [{ translateX: shakeAnim }] }]}>
            <Svg width={size} height={size}>
                <Defs>
                    <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%">
                        <Stop offset="0%" stopColor="#1E3A8A" stopOpacity="1" />
                        <Stop offset="80%" stopColor="#0B132B" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#8A6B00" stopOpacity="0.8" />
                    </RadialGradient>
                    <RadialGradient id="explosionGrad" cx="50%" cy="50%" rx="50%" ry="50%">
                        <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                        <Stop offset="30%" stopColor="#FFF200" stopOpacity="1" />
                        <Stop offset="70%" stopColor="#FF3300" stopOpacity="0.8" />
                        <Stop offset="100%" stopColor="#880000" stopOpacity="0" />
                    </RadialGradient>
                </Defs>

                {/* Outer Tech Border */}
                <Circle cx={center} cy={center} r={radius + 6} fill="none" stroke="#FFA500" strokeWidth={4} strokeOpacity={0.5} />
                <Circle cx={center} cy={center} r={radius + 2} fill="none" stroke="#FFD700" strokeWidth={6} />

                {/* Main background */}
                <Circle cx={center} cy={center} r={radius} fill="url(#grad)" stroke="#050A1F" strokeWidth={4} />

                {/* Radar lines */}
                <G opacity={0.2}>
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        return (
                            <Line
                                key={i}
                                x1={center}
                                y1={center}
                                x2={center + Math.cos(angle) * radius}
                                y2={center + Math.sin(angle) * radius}
                                stroke="#FFFFFF"
                                strokeWidth={1}
                                strokeDasharray="4, 8"
                            />
                        );
                    })}
                </G>

                {/* Tick marks */}
                <G>
                    {Array.from({ length: 25 }).map((_, i) => {
                        const deg = -120 + (i * 10);
                        const rad = ((deg - 90) * Math.PI) / 180;
                        const isMajor = i % 2 === 0;
                        const tickLength = isMajor ? 14 : 8;
                        const inR = radius - 15 - tickLength;
                        const outR = radius - 15;
                        const x1 = center + inR * Math.cos(rad);
                        const y1 = center + inR * Math.sin(rad);
                        const x2 = center + outR * Math.cos(rad);
                        const y2 = center + outR * Math.sin(rad);

                        const color = i < 6 ? "#FF2222" : i > 18 ? "#22FF22" : "#FFDD22";

                        return (
                            <Line
                                key={i}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke={color}
                                strokeWidth={isMajor ? 4 : 2}
                            />
                        );
                    })}
                </G>

                {/* Dynamic glowing arc */}
                {(() => {
                    const arcR = radius - 30;
                    const c = 2 * Math.PI * arcR;
                    const strokeProgress = progress * (240 / 360) * c;

                    return (
                        <G transform={`rotate(150 ${center} ${center})`}>
                            <Circle
                                cx={center} cy={center} r={arcR}
                                fill="none" stroke="#222" strokeWidth={12}
                                strokeDasharray={`${c * (240 / 360)} ${c}`}
                                strokeLinecap="round"
                            />
                            {!isExplodingLocal && (
                                <Circle
                                    cx={center} cy={center} r={arcR}
                                    fill="none" stroke={progress > 0.6 ? "#22FF22" : progress > 0.3 ? "#FFDD22" : "#FF2222"} strokeWidth={8}
                                    strokeDasharray={`${strokeProgress} ${c}`}
                                    strokeLinecap="round"
                                />
                            )}
                        </G>
                    );
                })()}
            </Svg>

            {/* Needle */}
            <Animated.View style={[
                styles.needleContainer,
                { width: size, height: size, transform: [{ rotate: rotation }] }
            ]}>
                <View style={styles.needleWrapper}>
                    <View style={styles.needle} />
                </View>
            </Animated.View>

            {/* Explosion overlay */}
            {isExplodingLocal && (
                <Animated.View style={[
                    StyleSheet.absoluteFill,
                    { justifyContent: 'center', alignItems: 'center', opacity: burstScale, transform: [{ scale: burstScale }] }
                ]}>
                    <Svg width={size} height={size}>
                        <Defs>
                            <RadialGradient id="overlayExplosionGrad" cx="50%" cy="50%" rx="50%" ry="50%">
                                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                                <Stop offset="30%" stopColor="#FFF200" stopOpacity="1" />
                                <Stop offset="70%" stopColor="#FF3300" stopOpacity="0.8" />
                                <Stop offset="100%" stopColor="#880000" stopOpacity="0" />
                            </RadialGradient>
                        </Defs>
                        <Circle cx={center} cy={center} r={radius * 1.05} fill="url(#overlayExplosionGrad)" opacity={0.7} />
                    </Svg>
                </Animated.View>
            )}

            {/* Center cap */}
            <View style={[
                styles.centerCap,
                { width: size * 0.42, height: size * 0.42, borderRadius: size * 0.21 }
            ]}>
                <ComicText style={styles.percentageText}>{Math.round(progress * 100)}%</ComicText>
            </View>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00F',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    needleContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    needleWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    needle: {
        position: 'absolute',
        top: '15%',
        width: 8,
        height: '35%',
        backgroundColor: '#FF2222',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        shadowColor: '#FF0000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#7A0000',
    },
    centerCap: {
        position: 'absolute',
        backgroundColor: '#1E293B',
        borderWidth: 3,
        borderColor: '#FFD700',
        shadowColor: '#00F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        color: '#FFD700',
        fontSize: 28,
        fontWeight: '900',
        textShadowColor: '#FFA500',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    }
});
