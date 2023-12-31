import ServiceCard from "@/components/serviceCard/ServiceCard"
import { services } from "@/constants"

const Services = () => {
    return (
        <section className="max-container justify-center items-center flex flex-wrap gap-9">
            {services.map((service) => (
                <ServiceCard key={service.label} {...service} />
            ))}
        </section>
    )
}

export default Services