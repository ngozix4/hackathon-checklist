import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { db } from "./firebase"; // path to your firebase.js
import { doc, setDoc, onSnapshot } from "firebase/firestore";

const initialChecklist = [ /* your checklist as before */ ];

export default function ChecklistApp() {
  const [checkedItems, setCheckedItems] = useState({});

  const checklistDocRef = doc(db, "checklists", "projectChecklist"); // single document for the checklist

  // Listen for real-time updates on mount
  useEffect(() => {
    const unsubscribe = onSnapshot(checklistDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCheckedItems(docSnapshot.data());
      } else {
        // If no data yet, initialize empty
        setCheckedItems({});
      }
    });

    return () => unsubscribe(); // clean up listener
  }, []);

  // Update Firestore when toggling items
  const toggleItem = async (section, item) => {
    const key = `${section}-${item}`;
    const newChecked = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newChecked);
    try {
      await setDoc(checklistDocRef, newChecked);
    } catch (err) {
      console.error("Error updating checklist:", err);
    }
  };

  // Reset checklist in Firestore
  const resetChecklist = async () => {
    try {
      await setDoc(checklistDocRef, {}); // clear all
    } catch (err) {
      console.error("Error resetting checklist:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>🧠 MediTrek Project Checklist</Text>
        {initialChecklist.map(({ section, items }) => (
          <View key={section} style={styles.card}>
            <Text style={styles.section}>{section}</Text>
            {items.map((item) => {
              const key = `${section}-${item}`;
              return (
                <View key={key} style={styles.itemRow}>
                  <Checkbox
                    value={!!checkedItems[key]}
                    onValueChange={() => toggleItem(section, item)}
                  />
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              );
            })}
          </View>
        ))}
        <TouchableOpacity style={styles.resetButton} onPress={resetChecklist}>
          <Text style={styles.resetText}>Reset Checklist</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Keep your styles as is...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    padding: 16
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  itemText: {
    marginLeft: 8,
    fontSize: 16
  },
  resetButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  resetText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});