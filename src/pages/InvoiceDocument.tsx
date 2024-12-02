import React from "react";
import { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    color: "#333",
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#4A90E2",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 5,
    alignItems: "center",
  },
  cell: {
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 5,
  },
  total: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
    textAlign: "right",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: "#555",
  },
});

// PDF Document Component
export default function InvoiceDocument ({ userName, project, timesheet, payPerHour, client }: any) {
  const totalPayable = timesheet.reduce(
    (sum: number, attendance: any) => sum + attendance.billable * payPerHour,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Invoice</Text>

        {/* User Info */}
        <View style={styles.section}>
          <Text>User Name: {userName}</Text>
          <Text>Project: {project}</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={{ ...styles.row, backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
            <Text style={styles.cell}>Total Hours Worked</Text>
            <Text style={styles.cell}>Billable Hours</Text>
            <Text style={styles.cell}>Total Payable Amount</Text>
          </View>
          {timesheet.map((attendance: any, index: number) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cell}>{attendance.totalHours}</Text>
              <Text style={styles.cell}>{attendance.billable}</Text>
              <Text style={styles.cell}>
                ${(attendance.billable * payPerHour).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Payable */}
        <Text style={styles.total}>Total Payable: ${totalPayable.toFixed(2)}</Text>

        {/* Footer */}
        <Text style={styles.footer}>Thank you for your work!</Text>
      </Page>
    </Document>
  );
};