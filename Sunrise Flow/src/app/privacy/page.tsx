import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-primary" />
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
          <p>
            Your privacy is important to us. This Privacy Policy explains how
            we handle your information in the Sunrise Flow application.
          </p>
          <h3 className="font-semibold text-lg">Information We Use</h3>
          <p>
            Sunrise Flow is designed to be a private experience. All your data, including alarms, tasks, and meditation preferences, is stored locally on your device using your browser's local storage.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>We do not collect or store any of your personal data on our servers.</strong>
            </li>
            <li>
              <strong>We do not track your usage of the app.</strong>
            </li>
            <li>
              The AI playlist generation feature sends only your selected categories (e.g., "Calm," "Focus") and the app's track list to the generative model. This information is not linked to you and is not stored.
            </li>
            <li>
              If you grant notification permissions, this is handled by your browser and operating system. We do not have access to this information.
            </li>
          </ul>

           <h3 className="font-semibold text-lg">Third-Party Services</h3>
           <p>We use Google Fonts to provide a consistent look and feel. Google may collect some data as described in their privacy policy.</p>

          <h3 className="font-semibold text-lg">Changes to This Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <div className="pt-4">
             <Link href="/settings" className="text-primary hover:underline">
                &larr; Back to Settings
             </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
