// DiagnosisComponent.tsx
import Image from 'next/image';
import React from 'react';
import imgg from '@/public/images/doctor.png';

interface Vitals {
  bloodGlucose: string;
  weight: string;
  heartRate: string;
  oxygenSaturation: string;
  bodyTemperature: string;
  bloodPressure: string;
}

interface Symptoms {
  bloodGlucose: string;
  nausea: string;
  heartRate: string;
}

interface Diagnosis {
  condition: string;
  test: string;
}

interface Medication {
  name: string;
  time: string;
  dosage: string;
}

interface TestReport {
  time: string;
  report: string;
}

interface DiagnosisData {
  doctorName: string;
  doctorTitle: string;
  appointment: string;
  vitals: Vitals;
  symptoms: Symptoms;
  diagnosis: Diagnosis;
  medications: Medication[];
  notes: string;
  testReports: TestReport[];
}

// Sample data (you can replace this with dynamic data from a state or API)
const diagnosisData: DiagnosisData = {
  doctorName: 'Dr. Emmiyas Kindie, M.D.',
  doctorTitle: 'Orthopedics Specialist',
  appointment: '3 Round Appointment',
  vitals: {
    bloodGlucose: '120 mg/dL',
    weight: '55 kg',
    heartRate: '70 bpm',
    oxygenSaturation: '71%',
    bodyTemperature: '98.1°F',
    bloodPressure: '120/80 mm Hg',
  },
  symptoms: {
    bloodGlucose: 'Headache',
    nausea: 'Nausea',
    heartRate: 'Heart rate',
  },
  diagnosis: {
    condition: 'Severe Nerve Disorder(SND)',
    test: 'UTI',
  },
  medications: [
    {
      name: 'Indevlor 20',
      time: '09/01, 02:20 PM',
      dosage: '2 Pills, 02:00 PM',
    },
  ],
  notes: 'Take medicine before meal',
  testReports: [
    {
      time: '02:00 PM',
      report: 'Nerve Disorder - A small nerve in the left-mid section of the neck has shown swollen properties. A brain scan is suggested',
    },
    {
      time: '02:00 PM',
      report: 'HIV - A small nerve in the left-mid section of the neck has shown swollen properties. A brain scan is suggested',
    },
  ],
};

const DiagnosisComponent: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <div className="flex items-center">
          <Image
            src={imgg}
            alt={`${diagnosisData.doctorName} profile`}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{diagnosisData.doctorName}</h2>
            <p className="text-sm text-gray-600">{diagnosisData.doctorTitle}</p>
          </div>
        </div>
        <h1 className="text-lg font-bold text-gray-800">{diagnosisData.appointment}</h1>
      </div>

      {/* Vitals */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div><strong>Blood glucose level</strong><br/>{diagnosisData.vitals.bloodGlucose}</div>
        <div><strong>Weight</strong><br/>{diagnosisData.vitals.weight}</div>
        <div><strong>Heart rate</strong><br/>{diagnosisData.vitals.heartRate}</div>
        <div><strong>Oxygen saturation</strong><br/>{diagnosisData.vitals.oxygenSaturation}</div>
        <div><strong>Body temperature</strong><br/>{diagnosisData.vitals.bodyTemperature}</div>
        <div><strong>Blood pressure</strong><br/>{diagnosisData.vitals.bloodPressure}</div>
      </div>

      {/* Symptoms */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Symptoms</h3>
        <div className="grid grid-cols-3 gap-4">
          <div><strong>Blood glucose level</strong><br/>{diagnosisData.symptoms.bloodGlucose}</div>
          <div><strong>Nausea</strong><br/>{diagnosisData.symptoms.nausea}</div>
          <div><strong>Heart rate</strong><br/>{diagnosisData.symptoms.heartRate}</div>
        </div>
      </div>

      {/* Diagnosis and Medications */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Diagnosis</h3>
          <p>{diagnosisData.diagnosis.condition}</p>
          <p>{diagnosisData.diagnosis.test}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Medications</h3>
          {diagnosisData.medications.map((med, index) => (
            <p key={index}>
              {med.name} - {med.time}, {med.dosage}
            </p>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
        <p>{diagnosisData.notes}</p>
      </div>

      {/* Test Reports */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Test reports</h3>
        {diagnosisData.testReports.map((report, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-600">{report.time}</p>
            <p className="text-gray-800">{report.report}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisComponent;