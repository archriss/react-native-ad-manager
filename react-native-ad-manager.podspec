require 'json'
package = JSON.parse(File.read("package.json"))

Pod::Spec.new do |s|
  s.name         = "react-native-ad-manager"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.requires_arc = true
  s.license      = package["license"]
  s.homepage     = package["homepage"]
  s.author       = package["author"]
  s.source       = { :git => package["repository"]["url"] }
  s.source_files = 'ios/**/*.{h,m}'
  s.platform     = :ios, "9.0"
  
  s.dependency 'React'
  s.dependency 'Google-Mobile-Ads-SDK'
end