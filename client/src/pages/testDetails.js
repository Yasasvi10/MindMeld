import { useParams } from "react-router-dom";

const TestDetails = () => {
  const { category } = useParams();

  return (
    <div className="test-details">
      <h2>{category} Test</h2>
      <p>Details about the selected test will go here.</p>
    </div>
  );
};

export default TestDetails;
