import UserDescriptionSelector from "../options";

export default function Phase1 () {
  return (
    <div className="p-8">
    <div className="mx-auto h-[500px] md:h-fit flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
            A totally new developer experience awaits you
          </h1>
      </div>
      <UserDescriptionSelector />
    </div>
    </div>
  )
}