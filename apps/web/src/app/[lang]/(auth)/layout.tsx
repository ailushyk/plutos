import { GradientText } from 'ui'
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="container mx-auto mb-12 flex items-center justify-center">
        <h1 className="text-lg font-extrabold text-white/80 sm:text-2xl lg:text-3xl xl:text-4xl">
          <GradientText>
            <span className="sm:text-4xl">Plutos</span>
          </GradientText>
        </h1>
      </div>
      {children}
    </div>
  )
}
