import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { OnboardingHeader } from "@/components/ui/OnboardingHeader";
import { addSubscription } from "@/lib/authConfig";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { fetchPaymentIntentClientSecret } from "@/lib/stripeConfig";
import { useTabVisibility } from '@/hooks/tabVisibility'

type SelectedOptionType = "monthly" | "6-months" | "yearly" | null;

export const SubscriptionPage = ({setShowSubscribePage} : {setShowSubscribePage: (value: boolean) => void}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectedOptionType>(null);
  const { setHideTabs } = useTabVisibility();

  useEffect(() => {
    setHideTabs(true); 
  }, []);

  const handlePayment = async () => {
    if (!selectedOption) {
      Alert.alert("No Plan Selected", "Please select a plan to proceed.");
      return;
    }
    setLoading(true);
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      if (error || !clientSecret) {
        throw new Error("Unable to fetch payment intent");
      }

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "SubBuddy",
      });

      if (initError) {
        throw new Error(initError.message);
      }

      const { error: sheetError } = await presentPaymentSheet();

      if (sheetError) {
        Alert.alert("Payment Failed", sheetError.message);
      } else {
        await addSubscription(selectedOption);
        Alert.alert("Success", "Your payment was successful!");
      }
    } catch (err: any) {
      Alert.alert("Payment Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51QFtGKGkI3xw0s4NfdbgKbZKpd50GZbNrwSaz0nr1bIdylMzHJN3dQ8Kd5k1kEqL7TYqt0FpcTo1uO1JoplVPRUS00uX5SW3Jx">
    <View style={styles.container}>
      <OnboardingHeader />

      <View style={styles.header}>
        <Text style={styles.headerText}>Choose your plan</Text>
      </View>
      <View style={styles.intro}>
        <Text style={styles.subtitle}>
          Select the plan that fits your needs and start saving today.
        </Text>
      </View>

      {/* Plan Options */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            selectedOption === "monthly" && styles.selectedCard,
          ]}
          onPress={() => setSelectedOption("monthly")}
        >
          <Text style={styles.cardTitle}>$6 / month</Text>
          <Text style={styles.cardDescription}>
            Billed monthly. Cancel anytime.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selectedOption === "6-months" && styles.selectedCard,
          ]}
          onPress={() => setSelectedOption("6-months")}
        >
          <Text style={styles.cardTitle}>$30 / 6 months</Text>
          <Text style={styles.cardDescription}>
            Save 16%! Billed every 6 months.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selectedOption === "yearly" && styles.selectedCard,
          ]}
          onPress={() => setSelectedOption("yearly")}
        >
          <Text style={styles.cardTitle}>$50 / year</Text>
          <Text style={styles.cardDescription}>
            Save 30%! Billed annually.
          </Text>
        </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.payButtonText}>Subscribe</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={styles.exitButton}
          onPress={()=> setShowSubscribePage(false)}
        >
            <Text style={styles.payButtonText}>Back</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d141c",
  },
  header: {
    paddingVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  intro: {
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    width: "75%",
  },
  cardsContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#262D46",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: "#344267",
    borderColor: "#AAEDFF",
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "white",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  payButton: {
    backgroundColor: "#344267",
    borderColor: "#AAEDFF",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#AAEDFF",
  },
  exitButton: {
    backgroundColor: "#344267",
    borderColor: "#AAEDFF",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 13,
    width: "100%",
    alignItems: "center",
    justifyContent: 'center',
  }
});
