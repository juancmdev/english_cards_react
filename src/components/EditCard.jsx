import { useParams } from "react-router-dom";




const EditCard = () => {
    const { id } = useParams();
    console.log(id);
     
  return <div></div>;
};

export default EditCard;
