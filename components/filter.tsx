import { 
  Card, 
  CardHeader, 
  CardTitle
} from "./ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Filter = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Card className="md:mx-4 mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <CardHeader className="space-y-0 py-0">
              <CardTitle className="text-xl font-semibold h-fit">Kata Kunci Pencarian</CardTitle>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default Filter