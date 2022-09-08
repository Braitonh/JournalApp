
import { AuthRoute } from "../auth/routes/AuthRoute"
import { Navigate, Route, Routes } from "react-router-dom"
import { JournalRoute } from "../journal/route/JournalRoute"
import { CheckingAuth } from "../ui/components/CheckingAuth"
import { useCheckAuth } from "../hooks"


export const AppRouter = () => {

  const { status } = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        (status === 'authenticated')
          ? 
            < Route path="/*" element={<JournalRoute />} />
          :
            <Route path="/auth/*" element={<AuthRoute />} />
      }

      <Route path="/*" element = {<Navigate to= '/auth/login'/>}  />

    </Routes>
  )
}
