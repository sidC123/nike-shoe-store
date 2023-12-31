import TestimonialCard from "./TestimonialCard"
import { reviews } from "@/constants"

const CustomerReviews = () => {
    return (
        <section className="max-container">

            <h3 className="font-bold font-Jost text-center text-4xl">What Our <span className="text-primary">Customers</span> Say?</h3>

            <p className="info-text text-center mt-2 m-auto max-w-lg">Hear genuine stories from our satisfied customers about their exceptional experience with Nike products</p>

            <div className="mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14">
                {reviews.map((review, index) => (
                    <TestimonialCard
                        key={index}
                        imgURL={review.imgURL}
                        customerName={review.customerName}
                        rating={review.rating}
                        feedback={review.feedback}
                    />
                ))}
            </div>
        </section>
    )
}

export default CustomerReviews