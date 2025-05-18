import CustomModal from "@/components/common-components/CustomModal"
import { useSessionUser } from "@/components/context/Session";
import { PatientModel } from "@/components/models/patient";
import { Box, useMediaQuery } from "@mui/material";
import { Descriptions, Form, Row } from "antd";
import { VisitCard } from "@/appPages/doctor/ActiveVisits";
import { useGetDoctorByIdQuery } from "@/redux/api/doctorApi"
// import {useGetPatientByIdQuery} from "@/redux/api/patientApi"


interface props{
    open:boolean,
    setOpen:(value:boolean)=>void,
    visit:VisitCard
}

export const ViewVisit = ({ open, setOpen, visit }: props) => {
    const { user }: { user?: PatientModel } = useSessionUser();
    const { data: doctorData } = useGetDoctorByIdQuery(visit.doctor);

    const [form] = Form.useForm();
    const matches = useMediaQuery("(min-width:900px)");

    return (
      <CustomModal
        modalTitle={"View Visit"}
        open={open}
        setOpen={setOpen}
        width={matches ? "75%" : "100%"}
      >
        <Row
          className={`flex flex-col ${matches ? "md:flex-row md:justify-around" : "flex-col"} w-full gap-4`}
          style={{ width: '100%' }}
        >
          <Descriptions
            className={matches ? "w-[45%] min-w-[250px]" : "w-full"}
            column={1}
            bordered
            size="middle"
            labelStyle={{ fontWeight: 600 }}
          >
            <Descriptions.Item label="Patient Name">{user?.firstname} {user?.lastname}</Descriptions.Item>
            <Descriptions.Item label="Visited Doctor">
              Dr. {doctorData?.data?.firstname} {doctorData?.data?.lastname}
            </Descriptions.Item>
            <Descriptions.Item label="Preferred Date">
              {new Date(visit.preferredDate).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Reason">{visit.reason}</Descriptions.Item>
            {visit.diagnosis && (
              <Descriptions.Item label="Diagnosis">{visit.diagnosis}</Descriptions.Item>
            )}
            {visit.notes && (
              <Descriptions.Item label="Notes">{visit.notes}</Descriptions.Item>
            )}
            <Descriptions.Item label="Status">{visit.status}</Descriptions.Item>
            <Descriptions.Item label="Approval">{visit.approval}</Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(visit.createdAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>

          {
            visit.prescription?.length||visit.labResults?.length?
            <Descriptions className={`${matches ? "w-[45%] min-w-[250px]" : "w-full"}`} column={1} bordered size="middle" labelStyle={{ fontWeight: 600 }}>
                  {/* Prescription List */}
                  {visit.prescription && visit.prescription.length > 0 && (
                  <Descriptions.Item label="Prescriptions">
                      {visit.prescription.map((pres, idx) => (
                      <Box key={idx} mb={1}>
                          <div><span className="text-gray-700 font-bold">Medication:</span> {pres.medication}</div>
                          <div><span className="text-gray-700 font-bold">Dosage:</span> {pres.dosage}</div>
                          <div className="mt-3"><span className="text-gray-700 font-bold">Instructions:</span> {pres.instructions}</div>
                          {idx !== (visit?.prescription?.length??0) - 1 && <hr />}
                      </Box>
                      ))}
                  </Descriptions.Item>
                  )}
      
                  {/* Lab Results List */}
                  {visit.labResults && visit.labResults.length > 0 && (
                  <Descriptions.Item label="Lab Results">
                      {visit.labResults.map((lab, idx) => (
                      <Box key={idx} mb={1}>
                          <div><span className="text-gray-700 font-bold">Test Name:</span> {lab.testName}</div>
                          <div>
                          <span className="text-gray-700 font-bold">Result: </span>
                          <a className="text-blue-600" href={lab.result} target="_blank" rel="noopener noreferrer">
                              View Result
                          </a>
                          </div>
                          {idx !== (visit?.labResults?.length??0) - 1 && <hr />}
                      </Box>
                      ))}
                  </Descriptions.Item>
                  )}
            </Descriptions>
            :<></>
          }
        </Row>
      </CustomModal>
    );
};