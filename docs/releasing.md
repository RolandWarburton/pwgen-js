# Releasing

```bash
export VERSION=1.0.0
git tag -a $VERSION -m "Release version $VERSION"
git push origin $VERSION
npm publish --access public --registry https://registry.npmjs.org/

# did not get this one to work yet
gh release create $VERSION ./* --notes "Release version $VERSION"
```
