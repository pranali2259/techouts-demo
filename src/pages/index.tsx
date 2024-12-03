import React from "react";
import Form from "./Form/Form3";
import Detail from "@/pages/Detail/Detail";

interface Data {
  empId: number;
  empName: string;
  topicsSelected: string[];
}
interface Data1 {
  topicId: number;
  subTopic: string;
  description: string;
  message: string;
}
interface DataProps {
  data: Data[];
  fetchedData: Data1[];
  status: number;
  message: string | undefined;
}
const index: React.FC<DataProps> = ({ data, fetchedData, status ,message}) => {
  return (
    <div className="bg-black">
      <Form fetchedData={fetchedData} status={status}  message={message} />
      <Detail data={data} />
    </div>
  );
};

export default index;

export async function getServerSideProps() {
  try {
    const response = await fetch("http://172.168.168.239:8080/get-all-users");
    const response1 = await fetch("http://172.168.168.239:8080/fetch-data");
    const data1 = await response1.json();
    const status = response1.status;

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return {
      props: {
        data,
        fetchedData: data1,
        message: data1.message || null,
        status,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: [],
        fetchedData: null,
        status: 500,
        message: null,
      },
    };
  }
}
