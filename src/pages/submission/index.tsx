import { channelState } from "@/features/channel-slice"
import { useAppSelector } from "@/hooks"
import { CategoryType } from "@/lib/models"
import { Form } from "antd"
import { useEffect } from "react"

// eslint-disable-next-line import/no-anonymous-default-export
export default function Submission(props: any){

    const { channels } = useAppSelector(channelState)

    useEffect(() => {
        if(channels){
          const count = Object.keys(channels).map(keys => ({ messages: channels[keys].filter(message => [CategoryType.MOVIES,CategoryType.FINANCE].includes(message.type)) }) )
            .reduce( (prev, curr) => ({ messages: prev.messages.concat(curr.messages) }), { messages: [] }).messages.length;
          console.log(count);
        }    
      },[channels]) 

    return (
      <>
        <Form>
          <Form.Item>
            
          </Form.Item>          
        </Form>
      </>
    )
}