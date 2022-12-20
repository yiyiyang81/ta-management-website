import { Rating } from "../../classes/Rating";

const RatingRow = (
    { rating }: {
        rating: Rating;
    }) => {

    return (
        <tr className="profTable">
            <td className="column0">
            </td>
            <td>{rating.created_at}</td>
            <td>{rating.course_number}</td>
            <td>{rating.course_name}</td>
            <td>{rating.rating_score}</td>
            <td>{rating.comment}</td>

        </tr>
    );
};

export default RatingRow;
