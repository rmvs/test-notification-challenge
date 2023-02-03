import { notify } from "@/features/channel-slice";
import { alert } from "@/features/message-slice";
import { useAppDispatch } from "@/hooks";
import { CategoryType } from "@/lib/models";
import { NotificationType } from "@/lib/models/notification";
import { notificationsAPI } from "@/lib/services/api";
import { Form, Select, Input, Button, FormInstance, message, Card, Space } from "antd";
import { useRef } from "react";
import uuid from "react-uuid";
import { MessageTypes } from "../message";

const { TextArea } = Input;

export default function SubmissionForm(props: any){

    const dispatch = useAppDispatch();

    const formRef = useRef<FormInstance>(null);
    const categories = Object.values(CategoryType).filter(value => isNaN(value as any));    
    
    const submitForm = async({ category, message}: any) => {

      dispatch(notify({
        channelType: NotificationType.EMAIL,
        message: {
          id: uuid(),
          type: category,
          message: message
        }
      }));      

      try{
        const response = await notificationsAPI.post({ category, message });
        if(!response.ok){
          throw "Error"
        }
        dispatch(alert({ data: "Message successfuly submitted!", type: MessageTypes.SUCCESS }))
      }catch(ex){
        dispatch(alert({ data: "Message could not be submitted", type: MessageTypes.ERROR }));
      }finally{
        formRef.current?.resetFields();
      }     
    }

    const changeCategoryOpts = (value: number) => {
      formRef.current?.setFieldValue('category',Object.keys(CategoryType)[value])      
    }

    return (
          <>
            <Form
                ref={formRef}
                onFinish={submitForm}
                noValidate>
              <Form.Item
                label={"Category"}
                name={"category"}
                rules={[
                    {
                        required: true,
                        message: "Category cannot be empty!"
                    }
                ]}
              >  
                <Select placeholder={"Select a category"} onChange={changeCategoryOpts}>
                    {
                        categories.map((category,index) => <Select.Option key={index}>{category}</Select.Option>)
                    }
                </Select>
              </Form.Item>
              <Form.Item
                label={"Message"}
                name={"message"}
                rules={[
                    {
                        required: true,
                        message: "Message cannot be empty!"
                    }
                ]}
              >
                <TextArea rows={4} required />
              </Form.Item>
              <Form.Item wrapperCol={{ sm: { offset: 8 } }}>
                <Space>
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Button onClick={() => formRef.current?.resetFields()}>Reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </>
        // style={{width:500}}
        // <Card title="Notification form">
        
        // </Card>
    )
}